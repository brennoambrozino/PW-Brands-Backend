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
const CustomError_1 = require("../errors/CustomError");
const User_1 = __importDefault(require("../model/User"));
class UserBusiness {
    constructor(userData, idGenerator, hashManager, authenticator, errors) {
        this.userData = userData;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.errors = errors;
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, primeiro_nome, ultimo_nome, telefone, senha } = input;
            let telefoneUniversalMethod = telefone;
            this.errors.signUpAndUpdate(email, primeiro_nome, ultimo_nome, telefone, senha, telefoneUniversalMethod);
            if (telefoneUniversalMethod[0] !== "+") {
                telefoneUniversalMethod = "+" + telefoneUniversalMethod;
            }
            const avatar = "https://via.placeholder.com/200.jpg/FFC0CB/FFC0CB?text=.";
            const registeredUser = yield this.userData.findByEmail(email);
            if (registeredUser) {
                throw new CustomError_1.CustomError(409, "Email já cadastrado");
            }
            const id = this.idGenerator.generateId();
            const hashedPassword = yield this.hashManager.hash(senha);
            const user = new User_1.default(id, email, primeiro_nome, ultimo_nome, telefoneUniversalMethod, avatar, hashedPassword);
            yield this.userData.insert(user);
            const token = this.authenticator.generateToken({ id });
            return token;
        });
        this.getAll = (nome, exibir, pagina) => __awaiter(this, void 0, void 0, function* () {
            const queryResult = yield this.userData.getAll();
            if (!queryResult) {
                throw new CustomError_1.CustomError(500, "Erro ao requisitar os usuários");
            }
            let data = [];
            let response = {};
            for (let user of queryResult) {
                const users = {
                    id: user.id,
                    email: user.email,
                    primeiro_nome: user.primeiro_nome,
                    ultimo_nome: user.ultimo_nome,
                    telefone: user.telefone,
                    avatar: user.avatar
                };
                data.push(users);
            }
            if (nome) {
                data = [];
                for (let user of queryResult) {
                    if (user.primeiro_nome.toUpperCase().includes(`${nome.toUpperCase()}`) === true) {
                        const users = {
                            id: user.id,
                            email: user.email,
                            primeiro_nome: user.primeiro_nome,
                            ultimo_nome: user.ultimo_nome,
                            telefone: user.telefone,
                            avatar: user.avatar
                        };
                        data.push(users);
                    }
                }
            }
            if (exibir) {
                data = [];
                const queryResultPage = yield this.userData.getAllByPage(pagina, exibir);
                for (let user of queryResultPage) {
                    const users = {
                        id: user.id,
                        email: user.email,
                        primeiro_nome: user.primeiro_nome,
                        ultimo_nome: user.ultimo_nome,
                        telefone: user.telefone,
                        avatar: user.avatar
                    };
                    data.push(users);
                }
                if (nome) {
                    data = [];
                    const queryResultName = yield this.userData.getAllByName(nome);
                    const queryResultPageName = yield this.userData.getAllByPageName(pagina, exibir, nome);
                    if (queryResultPageName) {
                        for (let user of queryResultPageName) {
                            const users = {
                                id: user.id,
                                email: user.email,
                                primeiro_nome: user.primeiro_nome,
                                ultimo_nome: user.ultimo_nome,
                                telefone: user.telefone,
                                avatar: user.avatar
                            };
                            data.push(users);
                        }
                    }
                    let total_paginas = queryResultName.length / exibir;
                    if (Number.isInteger(total_paginas) === false) {
                        const integer = total_paginas.toString().split(".");
                        total_paginas = Number(integer[0]) + 1;
                    }
                    response = {
                        pagina: pagina,
                        items_exibidos: data.length,
                        total_items: queryResultName.length,
                        total_paginas: total_paginas,
                        data: data
                    };
                }
                else {
                    let total_paginas = queryResult.length / exibir;
                    if (Number.isInteger(total_paginas) === false) {
                        const integer = total_paginas.toString().split(".");
                        total_paginas = Number(integer[0]) + 1;
                    }
                    response = {
                        pagina: pagina,
                        items_exibidos: data.length,
                        total_items: queryResult.length,
                        total_paginas: total_paginas,
                        data: data
                    };
                }
            }
            if (data.length === 0) {
                data = ["Nenhum usuário encontrado"];
            }
            if (Object.keys(response).length !== 0) {
                return response;
            }
            else {
                return data;
            }
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const queryResult = yield this.userData.getById(id);
            if (!queryResult) {
                throw new CustomError_1.CustomError(404, "Usuário não encontrado, confira se o id está correto");
            }
            const response = {
                id: queryResult.id,
                email: queryResult.email,
                primeiro_nome: queryResult.primeiro_nome,
                ultimo_nome: queryResult.ultimo_nome,
                telefone: queryResult.telefone,
                avatar: queryResult.avatar
            };
            return response;
        });
        this.update = (id, input) => __awaiter(this, void 0, void 0, function* () {
            const { email, primeiro_nome, ultimo_nome, telefone, senha } = input;
            const registeredUser = yield this.userData.getById(id);
            if (!registeredUser) {
                throw new CustomError_1.CustomError(404, "Id inválido");
            }
            const registeredEmail = yield this.userData.findByEmail(email);
            if (registeredEmail && registeredUser.email !== registeredEmail.email) {
                throw new CustomError_1.CustomError(409, "Email já cadastrado");
            }
            let telefoneUniversalMethod = telefone;
            this.errors.signUpAndUpdate(email, primeiro_nome, ultimo_nome, telefone, senha, telefoneUniversalMethod);
            if (telefoneUniversalMethod[0] !== "+") {
                telefoneUniversalMethod = "+" + telefoneUniversalMethod;
            }
            yield this.userData.update(id, input);
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            const registeredUser = yield this.userData.getById(id);
            if (!registeredUser) {
                throw new CustomError_1.CustomError(404, "Id inválido");
            }
            yield this.userData.delete(id);
        });
    }
}
exports.default = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map