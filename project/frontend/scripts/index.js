import * as api from "./api.js";
import * as sessao from "./session.js";

// ao clicar no botao entrar vai chamar a funcao que pega os dados do login
document.getElementById("btn_entrar").addEventListener("click", async function(){
    const dados_login = getDadosLogin();

    //verificar se nâo possuir dados ele informa dizendo que precisa de login pra entrar
    if(!dados_login){
        const container = document.getElementById('caixa')
        var mensagem = document.createElement("div");
        mensagem.className="mensagem";
        mensagem.textContent = "Informe seu login e senha para Entrar!"
        container.appendChild(mensagem); 
        
        return;
    }
    
    //aqui chama busca no arquivo api.js a rota que faz a autenticacao do usuario
    try {
        const response = await api.login(dados_login);  
        // guarda os dados da sessao do usuario, como codigo, permissao, etc...
        sessao.setSessaoUsuario(response.user)
        //se tiver algum response o usuario possui acesso e vai pro sistema
        if(response){ window.location.href="./pages/app.html"}

    } catch (error) {
        //se der algum erro ele é mostrado aqui
        const container = document.getElementById('caixa')
        var mensagem = document.createElement("div");
        mensagem.className="mensagem";
        mensagem.textContent = error
        container.appendChild(mensagem);
    }
});

function getDadosLogin () {
    //aqui vai buscar o input do login do usuario e vai pegar o valor
    const login = document.getElementById("login_input").value;
    //aqui vai pegar o input da senha do usuario e vai pegar o valor
    const password = document.getElementById("pass_input").value;
    //aqui ele vai aplicar o hash na senha do usuario por seguranca
    //const hash_login = api.hashLogin(login, password)
    //aqui vai armazenar os dados em um objeto
    const dados = { login: login, password: password }
    //aqui vai chamar a funcao que valida os dados de entrada do usuario
    if(!validarDadosLogin(dados)) {return null}
    //se possuir vai retornar eles pra passar depois na validacao
    return dados;
}
//aqui verifica se o usuario passou os dados de login e não vazio
function validarDadosLogin (dados) {
    return dados.login.trim() !== "" && dados.password.trim() !== "";
}
