"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserBusiness_1 = __importDefault(require("../src/business/UserBusiness"));
const Errors_1 = require("../src/errors/Errors");
const AuthenticatorMock_1 = require("./mocks/AuthenticatorMock");
const HashManagerMock_1 = require("./mocks/HashManagerMock");
const IdGeneratorMock_1 = require("./mocks/IdGeneratorMock");
const UserDataMock_1 = __importDefault(require("./mocks/UserDataMock"));
const userBusinessMock = new UserBusiness_1.default(new UserDataMock_1.default(), new IdGeneratorMock_1.IdGeneratorMock(), new HashManagerMock_1.HashManagerMock(), new AuthenticatorMock_1.AuthenticatorMock(), new Errors_1.Errors());
describe("Testando o Sign Up", () => {
    test("Deve retornar erro quando um campo estiver vazio", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brennolegal@gmail.com",
                primeiro_nome: "",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            };
            yield userBusinessMock.signup(input);
        }
        catch (error) {
            expect(error.message).toEqual("Campos inválidos, confira se todos foram preenchidos."),
                expect(error.statusCode).toBe(422);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Deve retornar erro quando o nome for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brennolegal@gmail.com",
                primeiro_nome: "br",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            };
            yield userBusinessMock.signup(input);
        }
        catch (error) {
            expect(error.message).toEqual("É necessário que o nome tenha mais de 3 caracteres"),
                expect(error.statusCode).toBe(401);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Deve retornar erro quando o sobrenome for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brennolegal@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "Silva Pereira Ambrozino Maravilhoso Perfeito Gente Boa",
                telefone: "5521995116053",
                senha: "12345678"
            };
            yield userBusinessMock.signup(input);
        }
        catch (error) {
            expect(error.message).toEqual("É necessário que o sobrenome tenha menos de 30 caracteres"),
                expect(error.statusCode).toBe(401);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Deve retornar erro quando o email não possuir '@' ", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brennolegalgmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            };
            yield userBusinessMock.signup(input);
        }
        catch (error) {
            expect(error.message).toEqual("É necessário conter '@' no email"),
                expect(error.statusCode).toBe(401);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Deve retornar erro quando o email não possuir '.' ", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brennolegal@gmail",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            };
            yield userBusinessMock.signup(input);
        }
        catch (error) {
            expect(error.message).toEqual("É necessário conter '.' no email"),
                expect(error.statusCode).toBe(401);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Deve retornar erro quando o email já for cadastrado", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brennoambrozino@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            };
            yield userBusinessMock.signup(input);
        }
        catch (error) {
            expect(error.message).toEqual("Email já cadastrado"),
                expect(error.statusCode).toBe(409);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Deve retornar erro quando o telefone for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brennolegal@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "+552199511605",
                senha: "12345678"
            };
            yield userBusinessMock.signup(input);
        }
        catch (error) {
            expect(error.message).toEqual("O telefone deve ser inserido no modelo '+55XX9XXXXXXXX' "),
                expect(error.statusCode).toBe(401);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Deve retornar erro quando a senha for inválida", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brennolegal@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "+5521995116053",
                senha: "12345"
            };
            yield userBusinessMock.signup(input);
        }
        catch (error) {
            expect(error.message).toEqual("A senha deve ter no mínimo 6 caracteres"),
                expect(error.statusCode).toBe(401);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Sucesso no cadastro e verificação de token", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brennolegal@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "+5521995116053",
                senha: "12345678910"
            };
            const accessToken = yield userBusinessMock.signup(input);
            expect(accessToken).toEqual("token");
        }
        catch (error) {
            console.log(error);
        }
        finally {
            expect.assertions(1);
        }
    }));
});
describe("Testando o GetById", () => {
    test("Deve retornar erro quando o id for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield userBusinessMock.getById("id_user_0");
        }
        catch (error) {
            expect(error.message).toEqual("Usuário não encontrado, confira se o id está correto"),
                expect(error.statusCode).toBe(404);
        }
        finally {
            expect.assertions(2);
        }
    }));
});
describe("Testando o Update", () => {
    test("Deve retornar erro quando um campo estiver vazio", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brennoambrozino@gmail.com",
                primeiro_nome: "",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "brennoambrozino"
            };
            yield userBusinessMock.update("id_user_1", input);
        }
        catch (error) {
            expect(error.message).toEqual("Campos inválidos, confira se todos foram preenchidos."),
                expect(error.statusCode).toBe(422);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Deve retornar erro quando o nome for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brennoambrozino@gmail.com",
                primeiro_nome: "br",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "brennoambrozino"
            };
            yield userBusinessMock.update("id_user_1", input);
        }
        catch (error) {
            expect(error.message).toEqual("É necessário que o nome tenha mais de 3 caracteres"),
                expect(error.statusCode).toBe(401);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Deve retornar erro quando o sobrenome for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brennoambrozino@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "Silva Pereira Ambrozino Maravilhoso Perfeito Gente Boa",
                telefone: "5521995116053",
                senha: "12345678"
            };
            yield userBusinessMock.update("id_user_1", input);
        }
        catch (error) {
            expect(error.message).toEqual("É necessário que o sobrenome tenha menos de 30 caracteres"),
                expect(error.statusCode).toBe(401);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Deve retornar erro quando o email não possuir '@' ", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brennogmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            };
            yield userBusinessMock.update("id_user_1", input);
        }
        catch (error) {
            expect(error.message).toEqual("É necessário conter '@' no email"),
                expect(error.statusCode).toBe(401);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Deve retornar erro quando o email não possuir '.' ", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brenno@gmail",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            };
            yield userBusinessMock.update("id_user_1", input);
        }
        catch (error) {
            expect(error.message).toEqual("É necessário conter '.' no email"),
                expect(error.statusCode).toBe(401);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Deve retornar erro quando o email já estiver cadastrado", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brenno@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            };
            yield userBusinessMock.update("id_user_1", input);
        }
        catch (error) {
            expect(error.message).toEqual("Email já cadastrado"),
                expect(error.statusCode).toBe(409);
        }
        finally {
            expect.assertions(2);
        }
    }));
    test("Deve retornar erro quando o id for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const input = {
                email: "brenno@gmail.com",
                primeiro_nome: "brenno",
                ultimo_nome: "ambrozino",
                telefone: "5521995116053",
                senha: "12345678"
            };
            yield userBusinessMock.update("id_user_0", input);
        }
        catch (error) {
            expect(error.message).toEqual("Id inválido"),
                expect(error.statusCode).toBe(404);
        }
        finally {
            expect.assertions(2);
        }
    }));
});
describe("Testando o Delete", () => {
    test("Deve retornar erro quando o id for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield userBusinessMock.delete("id_user_0");
        }
        catch (error) {
            expect(error.message).toEqual("Id inválido"),
                expect(error.statusCode).toBe(404);
        }
        finally {
            expect.assertions(2);
        }
    }));
});
//# sourceMappingURL=UserBusiness.test.js.map