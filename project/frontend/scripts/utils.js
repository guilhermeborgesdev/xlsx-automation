import * as functionsApi from "./api.js"

export function abrirModal(elemento) {
    const tela = document.getElementById(elemento);
    tela.classList.remove("hidden");
}

export async function abrirModalFormulario(elemento, formulario) {
    const formulario_elemento = document.getElementById(formulario) 
    formulario_elemento.reset();

    const tela = document.getElementById(elemento);
    tela.classList.remove("hidden");
}

export async function abrirModalFormularioEdicao(elemento, formulario) {
    const formulario_elemento = document.getElementById(formulario) 
    formulario_elemento.reset();

    const tela = document.getElementById(elemento);
    tela.classList.remove("hidden");
}

export function fecharModal(elemento) {
    const tela = document.getElementById(elemento)
    tela.classList.add("hidden");
}