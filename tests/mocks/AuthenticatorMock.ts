import { authenticationData } from "../../src/types/authenticationData"

export class AuthenticatorMock {

    generateToken = (
        payload: authenticationData
    ): string => {
        return "token"
    }

    getTokenData = (
        token:string
    ): authenticationData => {
        if(token === "token"){
            return {
                id: "id_mock"
            } 
        } else {
            return {
                id: undefined
            }
        }
    }
}