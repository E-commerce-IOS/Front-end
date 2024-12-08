export interface UsuarioLogin {
    id_usuario?: number,
    nomeUsuario: string,
    emailUsuario: string,
    senhaUsuario: string, //db = CHAR(10) 
    telefoneUsuario: string //db = CHAR(15)
    enderecoUsuario: string,
    administrador: boolean,
    token?: string
}
