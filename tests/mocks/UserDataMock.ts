import UserData from "../../src/data/UserData"
import User from "../../src/model/User"
import { updateInputDTO } from "../../src/types/updateInputDTO"
import { UserMock, UserMock_2 } from "./UserMock"

export default class UserDataMock extends UserData {
    protected TABLE_NAME = "table_mock"

    public insert = async (user: User):Promise<void> => {
    }

    public findByEmail = async(email: string):Promise<User | undefined> => {
        if(email === "brennoambrozino@gmail.com") {
            return UserMock
        }else if (email === "brenno@gmail.com"){
            return UserMock_2
        } else {
            return undefined
        }
    }

    public getById = async(id: string):Promise<User | undefined> => {
        if(id === "id_user_1") {
            return UserMock
        }else if (id === "id_user_2"){
            return UserMock_2
        } else {
            return undefined
        }
    }

    public update = async (id:string, input:updateInputDTO):Promise<void> => {

    }
    
}