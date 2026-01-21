import * as utils from "./utils.js";
import * as api from "./api.js";


//esconde o botao processar logo de inicio
document.getElementById('botao').style.visibility = 'hidden';
const upload = document.getElementById('upload_arquivos');

upload.addEventListener('change', verificaPlanilha)

function verificaPlanilha(){
    const botao = document.getElementById('botao');
    if (upload.files && upload.files.length > 0) {botao.style.visibility = 'visible'} else { botao.style.visibility = "hidden" }
}

function previewPlanilha(){
    
}

