"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, email, primeiro_nome, ultimo_nome, telefone, avatar, senha) {
        this.id = id;
        this.email = email;
        this.primeiro_nome = primeiro_nome;
        this.ultimo_nome = ultimo_nome;
        this.telefone = telefone;
        this.avatar = avatar;
        this.senha = senha;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getNome() {
        return this.primeiro_nome;
    }
    getSobreNome() {
        return this.ultimo_nome;
    }
    getTelefone() {
        return this.telefone;
    }
    getAvatar() {
        return this.avatar;
    }
    getSenha() {
        return this.senha;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map