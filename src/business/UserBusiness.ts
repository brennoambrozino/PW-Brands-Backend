import UserData from "../data/UserData"
import { CustomError } from "../errors/CustomError"
import { Errors } from "../errors/Errors"
import User from "../model/User"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { signupInputDTO } from "../types/signUpInputDTO"
import { updateInputDTO } from "../types/updateInputDTO"


export default class UserBusiness{

    constructor(
        private userData:UserData,
        private idGenerator:IdGenerator,
        private hashManager:HashManager,
        private authenticator:Authenticator,
        private errors: Errors
    ){}

    public signup = async(input:signupInputDTO):Promise<string> => {
        const { email, primeiro_nome, ultimo_nome, telefone, senha } = input

        let telefoneUniversalMethod = telefone

        this.errors.signUpAndUpdate(email, primeiro_nome, ultimo_nome, telefone, senha, telefoneUniversalMethod)

        if(telefoneUniversalMethod[0] !== "+"){
            telefoneUniversalMethod = "+" + telefoneUniversalMethod
        }

        const avatar = "https://via.placeholder.com/200.jpg/FFC0CB/FFC0CB?text=."

        const registeredUser = await this.userData.findByEmail(email)
        if(registeredUser){
            throw new CustomError(409,"Email já cadastrado")
        }
        
        const id = this.idGenerator.generateId()

        const hashedPassword = await this.hashManager.hash(senha)

        const user = new User(
            id,
            email,
            primeiro_nome,
            ultimo_nome,
            telefoneUniversalMethod,
            avatar,
            hashedPassword
        )

        await this.userData.insert(user)

        const token = this.authenticator.generateToken({id})

        return token
    }

    public getAll = async(nome:string, exibir:number, pagina:number) => {

        const queryResult:any = await this.userData.getAll()

        if(!queryResult) {
            throw new CustomError(500,"Erro ao requisitar os usuários")
        }

        let data = []
        let response = {}

        for (let user of queryResult) {
            
            const users = {
                id: user.id,
				email: user.email,
				primeiro_nome: user.primeiro_nome,
				ultimo_nome: user.ultimo_nome,
				telefone: user.telefone,
				avatar: user.avatar 
            }
            data.push(users)
        }

        if(nome){
            data = []

            for(let user of queryResult) {
                if(user.primeiro_nome.toUpperCase().includes(`${nome.toUpperCase()}`) === true) {
                    const users = {
                        id: user.id,
                        email: user.email,
                        primeiro_nome: user.primeiro_nome,
                        ultimo_nome: user.ultimo_nome,
                        telefone: user.telefone,
                        avatar: user.avatar 
                    }
                    data.push(users)
                }
            }
        }

        if(exibir) {
            data = []
            const queryResultPage:any= await this.userData.getAllByPage(pagina,exibir)

            for (let user of queryResultPage) {
            
                const users = {
                    id: user.id,
                    email: user.email,
                    primeiro_nome: user.primeiro_nome,
                    ultimo_nome: user.ultimo_nome,
                    telefone: user.telefone,
                    avatar: user.avatar 
                }
                data.push(users)
            }

            if(nome) {
                data = []
                const queryResultName:any = await this.userData.getAllByName(nome) 
                const queryResultPageName:any= await this.userData.getAllByPageName(pagina,exibir,nome)

                if(queryResultPageName){
                    for (let user of queryResultPageName) {
                
                        const users = {
                            id: user.id,
                            email: user.email,
                            primeiro_nome: user.primeiro_nome,
                            ultimo_nome: user.ultimo_nome,
                            telefone: user.telefone,
                            avatar: user.avatar 
                        }
                        data.push(users)
                    }
                }

                let total_paginas = queryResultName.length/exibir

                if(Number.isInteger(total_paginas) === false){
                    const integer = total_paginas.toString().split(".")
                    total_paginas = Number(integer[0]) + 1
                }

                response = {
                    pagina:pagina,
                    items_exibidos: data.length,
                    total_items: queryResultName.length,
                    total_paginas: total_paginas,
                    data: data
                }

            } else {
                let total_paginas = queryResult.length/exibir

                if(Number.isInteger(total_paginas) === false){
                    const integer = total_paginas.toString().split(".")
                    total_paginas = Number(integer[0]) + 1
                }

                response = {
                    pagina:pagina,
                    items_exibidos: data.length,
                    total_items: queryResult.length,
                    total_paginas: total_paginas,
                    data: data
                }
            }

    
        }

        if(data.length === 0){
            data = ["Nenhum usuário encontrado"]
        }

        if(Object.keys(response).length !== 0) {
            return response
        } else {
            return data
        }
    }

    public getById = async(id:string) => {
        const queryResult:any = await this.userData.getById(id)

        if(!queryResult) {
            throw new CustomError(404,"Usuário não encontrado, confira se o id está correto")
        }

        const response = {
            id: queryResult.id,
            email: queryResult.email,
            primeiro_nome: queryResult.primeiro_nome,
            ultimo_nome: queryResult.ultimo_nome,
            telefone: queryResult.telefone,
            avatar: queryResult.avatar
        }

        return response
    }

    public update = async(id:string, input:updateInputDTO):Promise<void> => {
        const { email, primeiro_nome, ultimo_nome, telefone, senha} = input

        const registeredUser:any = await this.userData.getById(id)
        if(!registeredUser){
            throw new CustomError(404,"Id inválido")
        }

        const registeredEmail:any = await this.userData.findByEmail(email)
        if(registeredEmail && registeredUser.email !== registeredEmail.email){
            throw new CustomError(409,"Email já cadastrado")
        }        

        let telefoneUniversalMethod = telefone

        this.errors.signUpAndUpdate(email, primeiro_nome, ultimo_nome, telefone, senha, telefoneUniversalMethod )

        if(telefoneUniversalMethod[0] !== "+"){
            telefoneUniversalMethod = "+" + telefoneUniversalMethod
        }

        await this.userData.update(id, input)
    }

    public delete = async(id:string):Promise<void> => {
        const registeredUser = await this.userData.getById(id)
        if(!registeredUser){
            throw new CustomError(404,"Id inválido")
        }

        await this.userData.delete(id)
    }
}