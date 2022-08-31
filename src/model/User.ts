export default class User{
    constructor(
        private id:string,
        private email:string,
        private primeiro_nome:string,
        private ultimo_nome:string,
        private telefone:string,
        private avatar:string,
        private senha:string
    ){}

    public getId(): string {
        return this.id;
    }
  
    public getEmail(): string {
        return this.email;
    }

    public getNome(): string {
        return this.primeiro_nome;
    }

    public getSobreNome(): string {
        return this.ultimo_nome;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public getAvatar(): string {
        return this.avatar;
    }

    public getSenha(): string {
        return this.senha;
    }
}