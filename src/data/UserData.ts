import User from "../model/User"
import { BaseDataBase } from "./BaseDataBase"

export default class UserData extends BaseDataBase{
    protected TABLE_NAME = "PW_BRANDS_USERS"

    public insert = async (user: User):Promise<void> => {
        try {
            await this
            .connection(this.TABLE_NAME)
            .insert(user)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }

    public findByEmail = async(email: string):Promise<User | undefined> => {
        try {
            const queryResult:User[] = await this
                .connection(this.TABLE_NAME)
                .select()
                .where({email})
            return queryResult[0]
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }

    public getAll = async():Promise<User[] | undefined> => {
        try {
            const queryResult:User[] = await this
                .connection(this.TABLE_NAME)
                .select("*")
            return queryResult
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }

    public getAllByPage = async (page:number, qtd:number):Promise<User[] | User | undefined> => {
        try {

            const queryResult: User[] = await this 
            .connection(this.TABLE_NAME)
            .select("*")
            .orderBy("primeiro_nome")
            .limit(qtd)
            .offset(qtd * (page - 1))
            
            return queryResult
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Error do banco !")
            }
        }
    }
    
}