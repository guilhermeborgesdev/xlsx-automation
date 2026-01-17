//infomracoes da sessao do usuario

const CHAVE = "chaveAcessoDadosUsuarios123#"

export function setSessaoUsuario(usuario){
    const dados = {
        codigo: usuario.US_CODIGO,
        login: usuario.US_LOGIN,
        nome: usuario.US_NOME,
        permissao: usuario.US_PERMISSAO
    }

    sessionStorage.setItem(CHAVE, JSON.stringify(dados))
}

export function getSessaoUsuario(){
    const dados = sessionStorage.getItem(CHAVE);
    return JSON.parse(dados)
}

export function logout(){
    sessionStorage.removeItem(CHAVE)
}