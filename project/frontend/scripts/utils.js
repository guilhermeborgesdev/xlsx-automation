import * as functionsApi from "./api.js"

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

    const tela = document.getElementById(elemento);
    //aqui ele deixa visivel o modal
    tela.classList.remove("hidden");
}

//aqui ele monta a funcao que fecha os modais do site
export function fecharModal(elemento) {
    const tela = document.getElementById(elemento)
    tela.classList.add("hidden");
}