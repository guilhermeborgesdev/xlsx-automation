import * as api from "./api.js";

document.getElementById("btn_entrar").addEventListener("click", async function(){
    const dados_login = getDadosLogin();

    if (!dados_login) {return}

    try {
        const response = await api.login(dados_login);
    } catch (error) {
        // precisa tratar erro de login
    }
});

function getDadosLogin () {
    const login = document.getElementById("login_input").value;
    const password = document.getElementById("password_input").value;
    //const hash_login = api.hashLogin(login, password)
    const dados = { login: hash_login.LOGIN, password: hash_login.PASSWORD }

    if(!validarDadosLogin(dados)) {return null}

    return dados;
}

function validarDadosLogin (dados) {
    return dados.login.trim() !== "" && dados.password.trim() !== "";
}

