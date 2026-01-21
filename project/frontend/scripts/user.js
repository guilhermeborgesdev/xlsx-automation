import * as api from "./api.js"
import * as utils from "./utils.js"

const gridOptions = {
    theme: agGrid.themeQuartz,
    rowData: [],
    columnDefs: [
        {field: 'Nome'},
        {field: 'Login'},
        {field: 'Permissao'},
        {field: 'Edicoes'}
    ]
}

async function iniciaGrid(){
    const gridElement = document.getElementById("lista_usuarios");
    const gridUsuarios = agGrid.createGrid(gridElement, gridOptions);

    try{
        const usuarios = await api.getUsuarios();
        const lista = [];

        usuarios.users.forEach(item => {
            lista.push ({
                Nome: item.NOME,
                Login: item.LOGIN,
                Permissao: item.PERMISSAO,
                Edicoes: ''
            })
        });
        gridUsuarios.setGridOption("rowData", lista);
    }
    catch(e){
        console.log('erro ao carregar usuarios' + e);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciaGrid);
} else {
    iniciaGrid();
}

const add_dialog = document.getElementById("adicionar_usuarios");
if(add_dialog !== null){
    const dados_linha = [];
    add_dialog.addEventListener("click", () => utils.abrirModalFormulario("modal_Add_Usuario", "novoUsuario", dados_linha));
}

const fecha_dialog_add_edt = document.getElementById("cancelar");
if(fecha_dialog_add_edt !== null){
    fecha_dialog_add_edt.addEventListener("click", () => utils.fecharModal("modal_Add_Usuario"));
}

const editar_usuario = document.getElementById("editar_usuarios");
if (editar_usuario !== null){
    editar_usuario.addEventListener("click", () => utils.abrirModalFormularioEdicao("modal_Add_Usuario", "novoUsuario"));
}

