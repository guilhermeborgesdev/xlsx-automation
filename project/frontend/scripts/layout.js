import * as api from "./api.js"

const views = {
    main: {
        title: "Inicio",
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
        title: "Usuarios",
        fragment: "../pages/user.html",
        script: "../scripts/user.js",
        module: true,
    },
};

//adiciona o nome do usuario e permissao
const dados_usuarios = await api.GetDadosLogin();
const nome_usuario = dados_usuarios.nome
document.getElementById('loginUsuario').innerHTML = nome_usuario

const permissao = dados_usuarios.permissao ;
permissao == 'A' ? document.getElementById('permissaoUsuario').innerHTML = 'Administrador' : document.getElementById('permissaoUsuario').innerHTML = 'Padrão';
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
