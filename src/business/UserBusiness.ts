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

    public signup = async(input:signupInputDTO) => {
        const { email, primeiro_nome, ultimo_nome, telefone, password} = input

        let telefoneUniversalMethod = telefone


        if(!email || !primeiro_nome || !ultimo_nome || !telefone || !password) {
            throw new Error("Campos inválidos")
        }

        if(email.indexOf("@") === -1) {
            throw new Error("É necessário conter '@' no email")   
        }

        if(email.indexOf(".c") === -1) {
            throw new Error("É necessário conter '.c' no email")   
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
}