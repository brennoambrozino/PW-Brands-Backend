import UserData from "../data/UserData"
import User from "../model/User"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { signupInputDTO } from "../types/signUpInputDTO"


export default class UserBusiness{

    constructor(
        private userData:UserData,
        private idGenerator:IdGenerator,
        private hashManager:HashManager,
        private authenticator:Authenticator
    ){}

    public signup = async(input:signupInputDTO):Promise<string> => {
        const { email, primeiro_nome, ultimo_nome, telefone, password} = input

        let telefoneUniversalMethod = telefone


        if(!email || !primeiro_nome || !ultimo_nome || !telefone || !password) {
            throw new Error("Campos inválidos")
        }

        if(email.indexOf("@") === -1) {
            throw new Error("É necessário conter '@' no email")   
        }

        if(email.indexOf(".") === -1) {
            throw new Error("É necessário conter '.' no email")   
        }

        if(primeiro_nome.length < 3 ) {
            throw new Error("É necessário que o nome tenha mais de 3 caracteres")
        }

        if(ultimo_nome.length > 30) {
            throw new Error("É necessário que o nome tenha menos de 30 caracteres")
        }

        if(ultimo_nome.length < 3 ) {
            throw new Error("É necessário que o sobrenome tenha mais de 3 caracteres")
        }

        if(primeiro_nome.length > 30) {
            throw new Error("É necessário que o sobrenome tenha menos de 30 caracteres")
        }

        if(password.length < 6) {
            throw new Error("A senha deve ter no mínimo 6 caracteres")
        }

        if(telefoneUniversalMethod.length < 13 || telefoneUniversalMethod.length > 14){
            throw new Error("O telefone deve ser inserido no modelo '+55XX9XXXXXXXX' ")
        }

        if(telefoneUniversalMethod.length === 13 && telefoneUniversalMethod[0] === "+"){
            throw new Error("O telefone deve ser inserido no modelo '+55XX9XXXXXXXX' ")
        }

        if(telefoneUniversalMethod.length === 14 && telefoneUniversalMethod[0] !== "+"){
            throw new Error("O telefone deve ser inserido no modelo '+55XX9XXXXXXXX' ")
        }

        if(telefoneUniversalMethod[0] !== "+"){
            telefoneUniversalMethod = "+" + telefoneUniversalMethod
        }

        const avatar = "https://via.placeholder.com/200.jpg/FFC0CB/FFC0CB?text=."

        const registeredUser = await this.userData.findByEmail(email)
        if(registeredUser){
            throw new Error("Email já cadastrado")
        }
        
        const id = this.idGenerator.generateId()

        const hashedPassword = await this.hashManager.hash(password)

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
            throw new Error("Erro ao requisitar os usuários")
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
            throw new Error("Usuário não encontrado, confira se o id está correto")
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
}