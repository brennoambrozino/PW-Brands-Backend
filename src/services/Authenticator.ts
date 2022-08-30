import * as jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import { authenticationData } from "../types/authenticationData"

dotenv.config()

export class Authenticator {

    generateToken = (
        payload: authenticationData
    ): string => {
        return jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: "60min"
            }
        )
    }

    getTokenData = (
        token:string
    ): authenticationData => {
        return jwt.verify(
            token,
            process.env.JWT_KEY as string
        ) as authenticationData
    }
}