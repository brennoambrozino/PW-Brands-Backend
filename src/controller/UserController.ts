import { Request, Response } from "express"
import UserBusiness from "../business/UserBusiness"
import { Errors } from "../errors/Errors"
import { signupInputDTO } from "../types/signUpInputDTO"
import { updateInputDTO } from "../types/updateInputDTO"


export default class UserController {

    constructor(
        private userBusiness: UserBusiness,
        public errors: Errors
    ){}

    public signup = async(req:Request, res:Response) => {
        const {email, primeiro_nome, ultimo_nome, telefone, senha} = req.body

        const input: signupInputDTO = { 
            email,
            primeiro_nome,
            ultimo_nome,
            telefone,
            senha
        }

        try {
            const token = await this.userBusiness.signup(input)

            res.status(201).send({message: "Usuário cadastrado com sucesso", token})
            
        } catch (error) {
            this.errors.controller(error, res, "Erro no signup")
        }

    }

    public getAll = async(req:Request, res:Response) => {

        const {nome, exibir, pagina} = req.query
        
        const users = await this.userBusiness.getAll(nome as string, Number(exibir), Number(pagina))

        try {
            res.status(200).send(users)
        } catch (error) {
            this.errors.controller(error, res, "Erro ao Localizar os Usuários")
        }
    }

    public getById = async(req:Request, res:Response) => {

        const { id } = req.params
        
        const user = await this.userBusiness.getById(id)

        try {
            res.status(200).send({data:user})
        } catch (error) {
            this.errors.controller(error, res, "Erro ao Localizar o Usuário")
        }
    }

    public update = async(req:Request, res:Response) => {
        const { id } = req.params

        const { email, primeiro_nome, ultimo_nome, telefone, senha} = req.body

        const input: updateInputDTO = {
            email,
            primeiro_nome,
            ultimo_nome,
            telefone,
            senha
        }

        try {
            await this.userBusiness.update(id, input)
            res.status(200).send({message:"Usuário atualizado com sucesso"})
        } catch (error) {
            this.errors.controller(error, res, "Erro ao Atualizar o Usuário")
        }
    }

    public delete = async(req:Request, res:Response) => {
        const { id } = req.params

        try {
            await this.userBusiness.delete(id)
            res.status(200).send({message:"Usuário deletado com sucesso"})
        } catch (error) {
            this.errors.controller(error, res, "Erro ao Deletar o Usuário")
        }
    } 
}