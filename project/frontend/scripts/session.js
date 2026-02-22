//infomracoes da sessao do usuario

//essa é a chave que precisa passar pra conseguir acessar os dados
const CHAVE = "chaveAcessoDadosUsuarios123#"

export function setSessaoUsuario(usuario){
    //aqui é recebido do back o que vai ser armazenado pra poder consultar
    const dados = {
        codigo: usuario.US_CODIGO,
        login: usuario.US_LOGIN,
        nome: usuario.US_NOME,
        permissao: usuario.US_PERMISSAO
    }
    //aqui ele vai salvr em memoria no navegador
    sessionStorage.setItem(CHAVE, JSON.stringify(dados))
}
//essa funcao serve pra quando chamar buscar os dados do usuario
export function getSessaoUsuario(){
    const dados = sessionStorage.getItem(CHAVE);
    return JSON.parse(dados)
}
//essa funcao serve pra quando fazer logout ele remover os dados em memoria do navegador
export function logout(){
    sessionStorage.removeItem(CHAVE)
}