import UserBusiness from "../src/business/UserBusiness"
import { Errors } from "../src/errors/Errors"
import { signupInputDTO } from "../src/types/signUpInputDTO"
import { updateInputDTO } from "../src/types/updateInputDTO"
import { AuthenticatorMock } from "./mocks/AuthenticatorMock"
import { HashManagerMock } from "./mocks/HashManagerMock"
import { IdGeneratorMock } from "./mocks/IdGeneratorMock"
import UserDataMock from "./mocks/UserDataMock"

const userBusinessMock = new UserBusiness (
    new UserDataMock(), // as UserDataBase
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock(),
    new Errors()
)

describe("Testando o Sign Up", () => {
    test("Deve retornar erro quando um campo estiver vazio", async () => {
        try {
            const input: signupInputDTO = {
                email: "brennolegal@gmail.com",
                primeiro_nome: "",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            }
            await userBusinessMock.signup(input)
        } catch (error: any) {
            expect(error.message).toEqual("Campos inválidos, confira se todos foram preenchidos."),
            expect(error.statusCode).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando o nome for inválido", async () => {
        try {
            const input: signupInputDTO = {
                email: "brennolegal@gmail.com",
                primeiro_nome: "br",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            }
            await userBusinessMock.signup(input)
        } catch (error: any) {
            expect(error.message).toEqual("É necessário que o nome tenha mais de 3 caracteres"),
            expect(error.statusCode).toBe(401)
        } finally {
            expect.assertions(2)
        }

    })

    test("Deve retornar erro quando o sobrenome for inválido", async () => {
        try {
            const input: signupInputDTO = {
                email: "brennolegal@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "Silva Pereira Ambrozino Maravilhoso Perfeito Gente Boa",
                telefone: "5521995116053",
                senha: "12345678"
            }
            await userBusinessMock.signup(input)
        } catch (error: any) {
            expect(error.message).toEqual("É necessário que o sobrenome tenha menos de 30 caracteres"),
            expect(error.statusCode).toBe(401)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando o email não possuir '@' ", async () => {
        try {
            const input: signupInputDTO = {
                email: "brennolegalgmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            }
            await userBusinessMock.signup(input)
        } catch (error: any) {
            expect(error.message).toEqual("É necessário conter '@' no email"),
            expect(error.statusCode).toBe(401)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando o email não possuir '.' ", async () => {
        try {
            const input: signupInputDTO = {
                email: "brennolegal@gmail",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            }
            await userBusinessMock.signup(input)
        } catch (error: any) {
            expect(error.message).toEqual("É necessário conter '.' no email"),
            expect(error.statusCode).toBe(401)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando o email já for cadastrado", async () => {
        try {
            const input: signupInputDTO = {
                email: "brennoambrozino@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            }
            await userBusinessMock.signup(input)
        } catch (error: any) {
            expect(error.message).toEqual("Email já cadastrado"),
            expect(error.statusCode).toBe(409)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando o telefone for inválido", async () => {
        try {
            const input: signupInputDTO = {
                email: "brennolegal@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "+552199511605",
                senha: "12345678"
            }
            await userBusinessMock.signup(input)
        } catch (error: any) {
            expect(error.message).toEqual("O telefone deve ser inserido no modelo '+55XX9XXXXXXXX' "),
            expect(error.statusCode).toBe(401)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando a senha for inválida", async () => {
        try {
            const input: signupInputDTO = {
                email: "brennolegal@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "+5521995116053",
                senha: "12345"
            }
            await userBusinessMock.signup(input)
        } catch (error: any) {
            expect(error.message).toEqual("A senha deve ter no mínimo 6 caracteres"),
            expect(error.statusCode).toBe(401)
        } finally {
            expect.assertions(2)
        }
    })

    test("Sucesso no cadastro e verificação de token", async () => {
        try {
            const input: signupInputDTO = {
                email: "brennolegal@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "+5521995116053",
                senha: "12345678910"
            }
            const accessToken = await userBusinessMock.signup(input)
            expect(accessToken).toEqual("token") 
        } catch (error:any) {
            console.log(error)
        } finally {
            expect.assertions(1)
        }
    })
})

describe("Testando o GetById", () => {
    test("Deve retornar erro quando o id for inválido", async () => {
        try {
            await userBusinessMock.getById("id_user_0")
        } catch (error: any) {
            expect(error.message).toEqual("Usuário não encontrado, confira se o id está correto"),
            expect(error.statusCode).toBe(404)
        } finally {
            expect.assertions(2)
        }
    })
})

describe("Testando o Update", () => {
    test("Deve retornar erro quando um campo estiver vazio", async () => {
        try {
            const input: updateInputDTO = {
                email: "brennoambrozino@gmail.com",
                primeiro_nome: "",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "brennoambrozino"
            }
            await userBusinessMock.update("id_user_1", input)
        } catch (error: any) {
            expect(error.message).toEqual("Campos inválidos, confira se todos foram preenchidos."),
            expect(error.statusCode).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando o nome for inválido", async () => {
        try {
            const input: updateInputDTO = {
                email: "brennoambrozino@gmail.com",
                primeiro_nome: "br",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "brennoambrozino"
            }
            await userBusinessMock.update("id_user_1", input)
        } catch (error: any) {
            expect(error.message).toEqual("É necessário que o nome tenha mais de 3 caracteres"),
            expect(error.statusCode).toBe(401)
        } finally {
            expect.assertions(2)
        }

    })

    test("Deve retornar erro quando o sobrenome for inválido", async () => {
        try {
            const input: updateInputDTO = {
                email: "brennoambrozino@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "Silva Pereira Ambrozino Maravilhoso Perfeito Gente Boa",
                telefone: "5521995116053",
                senha: "12345678"
            }
            await userBusinessMock.update("id_user_1", input)
        } catch (error: any) {
            expect(error.message).toEqual("É necessário que o sobrenome tenha menos de 30 caracteres"),
            expect(error.statusCode).toBe(401)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando o email não possuir '@' ", async () => {
        try {
            const input: updateInputDTO = {
                email: "brennogmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            }
            await userBusinessMock.update("id_user_1",input)
        } catch (error: any) {
            expect(error.message).toEqual("É necessário conter '@' no email"),
            expect(error.statusCode).toBe(401)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando o email não possuir '.' ", async () => {
        try {
            const input: updateInputDTO = {
                email: "brenno@gmail",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            }
            await userBusinessMock.update("id_user_1",input)
        } catch (error: any) {
            expect(error.message).toEqual("É necessário conter '.' no email"),
            expect(error.statusCode).toBe(401)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando o email já estiver cadastrado", async () => {
        try {
            const input: updateInputDTO = {
                email: "brenno@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            }
            await userBusinessMock.update("id_user_1",input)
        } catch (error: any) {
            expect(error.message).toEqual("Email já cadastrado"),
            expect(error.statusCode).toBe(409)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando o id for inválido", async () => {
        try {
            const input: updateInputDTO = {
                email: "brenno@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            }
            await userBusinessMock.update("id_user_0",input)
        } catch (error: any) {
            expect(error.message).toEqual("Id inválido"),
            expect(error.statusCode).toBe(404)
        } finally {
            expect.assertions(2)
        }
    })

    
})

describe("Testando o Delete", () => {
    test("Deve retornar erro quando o id for inválido", async () => {
        try {
            await userBusinessMock.delete("id_user_0")
        } catch (error: any) {
            expect(error.message).toEqual("Id inválido"),
            expect(error.statusCode).toBe(404)
        } finally {
            expect.assertions(2)
        }
    })
})


