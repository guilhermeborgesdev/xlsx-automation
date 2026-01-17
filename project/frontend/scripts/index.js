import * as api from "./api.js";
import * as sessao from "./session.js";

document.getElementById("btn_entrar").addEventListener("click", async function(){
    const dados_login = getDadosLogin();
    if(!dados_login){
        const container = document.getElementById('caixa')
        var mensagem = document.createElement("div");
        mensagem.className="mensagem";
        mensagem.textContent = "Informe seu login e senha para Entrar!"
        container.appendChild(mensagem); 
        
        return;
    }
    
    try {
        const response = await api.login(dados_login);  
        sessao.setSessaoUsuario(response.user)
        if(response){ window.location.href="./pages/app.html"}

    } catch (error) {
        const container = document.getElementById('caixa')
        var mensagem = document.createElement("div");
        mensagem.className="mensagem";
        mensagem.textContent = error
        container.appendChild(mensagem);
    }
});

function getDadosLogin () {
    const login = document.getElementById("login_input").value;
    const password = document.getElementById("pass_input").value;
    //const hash_login = api.hashLogin(login, password)
    const dados = { login: login, password: password }

    if(!validarDadosLogin(dados)) {return null}

    return dados;
}

function validarDadosLogin (dados) {
    return dados.login.trim() !== "" && dados.password.trim() !== "";
}
