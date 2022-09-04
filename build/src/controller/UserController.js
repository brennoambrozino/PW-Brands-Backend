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
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(userBusiness, errors) {
        this.userBusiness = userBusiness;
        this.errors = errors;
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, primeiro_nome, ultimo_nome, telefone, senha } = req.body;
            const input = {
                email,
                primeiro_nome,
                ultimo_nome,
                telefone,
                senha
            };
            try {
                const token = yield this.userBusiness.signup(input);
                res.status(201).send({ message: "Usuário cadastrado com sucesso", token });
            }
            catch (error) {
                this.errors.controller(error, res, "Erro no signup");
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nome, exibir, pagina } = req.query;
            const users = yield this.userBusiness.getAll(nome, Number(exibir), Number(pagina));
            try {
                res.status(200).send(users);
            }
            catch (error) {
                this.errors.controller(error, res, "Erro ao Localizar os Usuários");
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield this.userBusiness.getById(id);
            try {
                res.status(200).send({ data: user });
            }
            catch (error) {
                this.errors.controller(error, res, "Erro ao Localizar o Usuário");
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { email, primeiro_nome, ultimo_nome, telefone, senha } = req.body;
            const input = {
                email,
                primeiro_nome,
                ultimo_nome,
                telefone,
                senha
            };
            try {
                yield this.userBusiness.update(id, input);
                res.status(200).send({ message: "Usuário atualizado com sucesso" });
            }
            catch (error) {
                this.errors.controller(error, res, "Erro ao Atualizar o Usuário");
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.userBusiness.delete(id);
                res.status(200).send({ message: "Usuário deletado com sucesso" });
            }
            catch (error) {
                this.errors.controller(error, res, "Erro ao Deletar o Usuário");
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map