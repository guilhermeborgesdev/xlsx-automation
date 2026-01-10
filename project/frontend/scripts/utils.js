import * as functionsApi from "./api.js" 


export async function buscaDadosUsuarioLogado(codigo_usuario){
    const response = functionsApi.getUsusario(codigo_usuario) //chamando a api que pega os dados pelo id do usuario 
    const permissao = response.PERMISSAO ;
    permissao == 'A' ? document.getElementById('permissaoUsuario').innerHTML = 'Administrador' : document.getElementById('permissaoUsuario').innerHTML = 'Padrão';
    if (permissao !== 'A') { 
        document.getElementById('dashboards').style.display = 'none'
        document.getElementById('user').style.display = 'none'
    }

    return response;
};
