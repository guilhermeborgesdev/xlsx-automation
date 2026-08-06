import * as functionsApi from "./api.js";
import * as session from "./session.js";

//aqui ele monta a funcao que vai abrir o dialog dos usuario
export async function abrirModalFormulario(elemento, formulario) {
    //vai pegar o titulo do modal e colocar que é adicao
    const titulo_id = document.getElementById('titulo-modal-user')
    titulo_id.innerText = 'Novo Usuário'
    const formulario_elemento = document.getElementById(formulario) 
    //aqui vai deixar o formulario em branco
    formulario_elemento.reset();

    const tela = document.getElementById(elemento);
    //aqui ele deixa visivel o modal
    tela.classList.remove("hidden");
}

//aqui ele monta a funcao que vai abrir o dialog de edicao dos usuario
export async function abrirModalFormularioEdicao(elemento, formulario, dados) {
    //vai pegar o id do titulo do modal e colocar que é edicao
    const titulo_id = document.getElementById('titulo-modal-user')
    titulo_id.innerHTML = 'Edição Usuário'

    const formulario_elemento = document.getElementById(formulario) 
    //aqui vai deixar o formulario em branco
    formulario_elemento.reset();

    try {
        formulario_elemento.elements['nome'].value = dados.Nome
        formulario_elemento.elements['login'].value = dados.Login
        formulario_elemento.elements['senha'].value = dados.Senha
        formulario_elemento.elements['permissao'].value = dados.Permissao
    } catch (e) {
        retornaMensagem('Erro', formulario_elemento, e)
    }

    const tela = document.getElementById(elemento);
    //aqui ele deixa visivel o modal
    tela.classList.remove("hidden");
}

//aqui ele monta a funcao que fecha os modais do site
export function fecharModal(elemento) {
    const tela = document.getElementById(elemento)
    tela.classList.add("hidden");
}

//essa mensagem retorna erro ou algum bloqueio pro usuario
export function retornaMensagem(nome_tela, mensagem){
    var nome_da_tela = nome_tela

// precisa criar a mensagem de erro e os tipos
}

export function sair_sistema(){
    session.logout();
    window.location.href="../index.html";
}

export function abre_dialog_confirmacao(tela, acao) {
    if (tela = 'user') {
        if (acao = 'deleter') {
            
        } else if (acao = 'editar') {
            
        } else if (acao = 'adicionar') {
            
        }
    } else if (tela = 'layout'){
        if (acao = 'sair'){
            
        }
    }
}