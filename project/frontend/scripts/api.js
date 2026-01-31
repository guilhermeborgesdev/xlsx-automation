import * as sessao from "./session.js";

const API_BASE = "http://localhost:3000"; // a porta do Express
const headers = { "Content-Type": "application/json" }

async function parseResponse(response) {
    let result = null;

    try {
        result = await response.json();
    } catch (error) {
        
    }

    if (!response.ok) {
        throw new Error(result?.error || `Erro HTTP ${response.status}`);   
    }

    return result;
}

export async function GetDadosLogin(){
    const dados_usuarios = sessao.getSessaoUsuario();

    return dados_usuarios;
}

// API login usuario
export async function login(dados) {
    const response = await fetch(`${API_BASE}/api/auth`, {
        method: "POST",
        headers: headers,
        body : JSON.stringify(dados)
    });

    return parseResponse(response);
}


// APIS pra pegar dados dos usuários
export async function getUsuarios(){
    const response = await fetch (`${API_BASE}/api/users`, {
        method: "GET",
        headers: headers
    });

    return parseResponse(response);
}

//Pega o historico de todos os usuarios
export async function getHistorico(){
    const response = await fetch (`${API_BASE}/api/history`, {
        method: "GET",
        headers: headers
    })

    return parseResponse(response);
}

// pega o historico de usuarios especificos
export async function getHistoricoUsuario(idUser){
    const response = await fetch (`${API_BASE}/api/history/${idUser}`, {
        method: "GET",
        headers: headers
    })

    return parseResponse(response);
}

// Pega dados de um usuario especifico
export async function getUsusario(idUser){
    const response = await fetch (`${API_BASE}/api/users/${idUser}`, {
        method: "GET",
        headers: headers
    });

    return parseResponse(response);
}


// APIS pra pegar historico das planilhas
export async function HistoricoPlanilhas() {
    const response = await fetch (`${API_BASE}/api/planilhas`, {
        method: "GET",
        headers: headers
    })

    return parseResponse(response);
}

export async function HistoricoPlanilhasUsuarios(id) {
    const response = await fetch (`${API_BASE}/api/planilhas/${id}`, {
        method: "GET",
        headers: headers
    })

    return parseResponse(response);
}

export async function HistoricoPlanilhasindividual(cod_usuario){
    const response = await fetch (`${API_BASE}/api/planilhas/${cod_usuario}`, {
        method: "GET",
        headers: headers,
    })

    return parseResponse(response);
}

// APIS
export async function upload(planilha){
    const form = new FormData();
    form.append("file", planilha)

    const response = await fetch(`${API_BASE}/api/uploads`, {
        method: "POST",
        body: form
    });

    return parseResponse(response);
}

export async function work(planilhaId){
    const response = await fetch(`${API_BASE}/api/work`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({planilhaId})
    });

    return parseResponse(response);
}

export async function resultWork(idwork){
    const response = await fetch (`${API_BASE}/api/result/${idwork}`, {
        method: "GET",
        headers: headers
    });

    return parseResponse(response);
}

