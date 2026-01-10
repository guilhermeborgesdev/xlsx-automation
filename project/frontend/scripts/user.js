import * as api from "./api.js"

const usuarios = api.getUsuarios();

for (let i = 0; usuarios.length > i; i ++){
 // for pra criar o row data da grid
}
const gridOptions = {
    rowData: [{

    }],

    columnsDefs: [
        {field: 'Login'},
        {field: 'Permissao'},
        {field: 'Edicoes'}
    ]
}

const gridElement = document.getElementById('lista_usuarios');
agGrid.createGrid(gridElement, gridOptions);
