import * as utils from "./utils.js";
import * as api from "./api.js";


//esconde o botao processar logo de inicio
document.getElementById('botao').style.visibility = 'hidden'
const upload = document.getElementById('upload_arquivos');
upload.addEventListener('change', verificaPlanilha)

function verificaPlanilha(){
    if (upload.files && upload.files.length > 0) {document.getElementById('botao').style.visibility = 'visible'}
}

function previewPlanilha(){
    
}

