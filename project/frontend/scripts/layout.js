import * as api from "./api.js"
import * as utils from "./utils.js"

//aqui é onde fica as telas do sistema
//definie o titulo, o caminho do html, o caminho do js, e se é um modulo
const views = {
    main: {
        title: "Início",
        fragment: "../pages/main.html",
        script: "../scripts/main.js",
        module: true,
    },
    dashboards: {
        title: "Dashboards",
        fragment: "../pages/dashboards.html",
        script: "../scripts/dashboards.js",
        module: true,
    },
    user: {
        title: "Usuários",
        fragment: "../pages/user.html",
        script: "../scripts/user.js",
        module: true,
    },
};

//adiciona o nome do usuario e permissao
const dados_usuarios = await api.GetDadosLogin();
const nome_usuario = dados_usuarios.nome
document.getElementById('loginUsuario').innerHTML = nome_usuario

const botao_sair = document.getElementById('sair_sistema');
botao_sair.addEventListener('click', utils.sair_sistema)
//aqui vai ter operador ternario, se o usuario tiver permissao A entao é admin, se não é padrão
const permissao = dados_usuarios.permissao ;
permissao == 'A' ? document.getElementById('permissaoUsuario').innerHTML = 'Administrador' : document.getElementById('permissaoUsuario').innerHTML = 'Padrão';
//se o usuário não for adinistrador ele não tem acesso a tela, e esse style display retira as telas de dash e usuarios
if (permissao !== 'A') { 
    document.getElementById('dashboards').style.display = 'none'
    document.getElementById('user').style.display = 'none'
}


function getViewKey() {
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view");
    return views[view] ? view : "main";
}

async function loadView() {
    const viewKey = getViewKey();
    const view = views[viewKey];
    const content = document.getElementById("page_content");

    document.title = view.title;

    try {
        const response = await fetch(view.fragment, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Erro ao carregar ${view.fragment}`);
        }
        content.innerHTML = await response.text();
    } catch (error) {
        content.innerHTML = "<div class=\"panel\">Nao foi possivel carregar esta pagina.</div>";
    }

    const activeLink = document.querySelector(`[data-view=\"${viewKey}\"]`);
    if (activeLink) {
        activeLink.classList.add("active");
    }

    if (view.script) {
        const script = document.createElement("script");
        script.src = view.script;
        if (view.module) {
            script.type = "module";
        }
        document.body.appendChild(script);
    }
}

loadView();
