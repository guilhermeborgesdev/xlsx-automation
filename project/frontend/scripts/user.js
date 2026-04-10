import * as api from "./api.js"
import * as utils from "./utils.js"

//aqui monta a grid dos usuarios do AgGrid
const gridOptions = {
    theme: agGrid.themeQuartz,
    defaultColDef: {
        cellStyle: { display: 'flex', 'justify-content': 'left' }
    },
    rowData: [],
    columnDefs: [
        {field: 'Nome', width: 400},
        {field: 'Login', width: 430},
        {field: 'Permissao', width: 100 },
        {field: 'Senha', widht: 0, hide: 'true'},
        {field: 'Edicoes', width: 600}
    ]
}
//aqui ele vai iniciar a grid
async function iniciaGrid(){
    const gridElement = document.getElementById("lista_usuarios");
    const gridUsuarios = agGrid.createGrid(gridElement, gridOptions);

    try{
        //aqui vai pegar os usuarios 
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
//aqui vai buscar o botao de adicionar usuarios
const add_dialog = document.getElementById("adicionar_usuarios");
if(add_dialog !== null){
    //se exisitr o botao ele vai abrir adicionar uma funcao de click que vai chamar a funcao de abrir o model de usuario
    add_dialog.addEventListener("click", () => utils.abrirModalFormulario("modal_Add_Usuario", "novoUsuario"));
}

//aqui vai pegar e ver se existe o botao de fechar
const fecha_dialog_add_edt = document.getElementById("cancelar");
if(fecha_dialog_add_edt !== null){
    const dados_linha = [];
    //se exisitr ele fechar o dialog
    fecha_dialog_add_edt.addEventListener("click", () => utils.fecharModal("modal_Add_Usuario", dados_linha));
}

//aqui vai ver se exise o botao de editar usuario
const editar_usuario = document.getElementById("editar_usuarios");
if (editar_usuario !== null){
    //se exisir ele vai colocar o evento de click e chamar a funcao que abre o dialgo de edicao de usuarios
    editar_usuario.addEventListener("click", () => utils.abrirModalFormularioEdicao("modal_Add_Usuario", "novoUsuario"));
}

