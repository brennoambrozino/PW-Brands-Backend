import { Request, Response } from "express"
import UserBusiness from "../business/UserBusiness"
import { signupInputDTO } from "../types/signUpInputDTO"


export default class UserController {

    constructor(
        private userBusiness: UserBusiness
    ){}

    signup = async(req:Request, res:Response) => {
        const {email, primeiro_nome, ultimo_nome, telefone, password} = req.body

        const input: signupInputDTO = { 
            email,
            primeiro_nome,
            ultimo_nome,
            telefone,
            password
        }

        try {
            const token = await this.userBusiness.signup(input)

            res.status(201).send({message: "Usuário cadastrado com sucesso", token})
            
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no signup")
        }

    }
}