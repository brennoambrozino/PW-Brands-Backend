import { CustomError } from "./CustomError"

export class Errors {

    public signUpAndUpdate = (
        email:string, 
        primeiro_nome:string,
        ultimo_nome:string,
        telefone:string,
        senha:string,
        telefoneUniversalMethod:string
        ) => {
        if(!email || !primeiro_nome || !ultimo_nome || !telefone || !senha) {
            throw new CustomError(422,"Campos inválidos, confira se todos foram preenchidos.")
        }
    
        if(email.indexOf("@") === -1) {
            throw new CustomError(401,"É necessário conter '@' no email")   
        }
    
        if(email.indexOf(".") === -1) {
            throw new CustomError(401,"É necessário conter '.' no email")   
        }
    
        if(primeiro_nome.length < 3 ) {
            throw new CustomError(401,"É necessário que o nome tenha mais de 3 caracteres")
        }
    
        if(ultimo_nome.length > 30) {
            throw new CustomError(401,"É necessário que o nome tenha menos de 30 caracteres")
        }
    
        if(ultimo_nome.length < 3 ) {
            throw new CustomError(401,"É necessário que o sobrenome tenha mais de 3 caracteres")
        }
    
        if(primeiro_nome.length > 30) {
            throw new CustomError(401,"É necessário que o sobrenome tenha menos de 30 caracteres")
        }
    
        if(senha.length < 6) {
            throw new CustomError(401,"A senha deve ter no mínimo 6 caracteres")
        }
    
        if(telefoneUniversalMethod.length < 13 || telefoneUniversalMethod.length > 14){
            throw new CustomError(401,"O telefone deve ser inserido no modelo '+55XX9XXXXXXXX' ")
        }
    
        if(telefoneUniversalMethod.length === 13 && telefoneUniversalMethod[0] === "+"){
            throw new CustomError(401,"O telefone deve ser inserido no modelo '+55XX9XXXXXXXX' ")
        }
    
        if(telefoneUniversalMethod.length === 14 && telefoneUniversalMethod[0] !== "+"){
            throw new CustomError(401,"O telefone deve ser inserido no modelo '+55XX9XXXXXXXX' ")
        }
    }

    public controller = (error:any, res:any, message:string) => {
        if (error instanceof Error) {
            return res.status(400).send(error.message)
        }
        res.status(500).send(message)
    }
}