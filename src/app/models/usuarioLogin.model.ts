export interface UsuarioLogin {
    id_usuario?: number,
    nome_usuario: string,
    email_usuario: string,
    senha_usuario: string, //db = CHAR(10) 
    telefone_usuario: string //db = CHAR(15)
    endereco_usuario: string,
    administrador: boolean,
    token: string
}
