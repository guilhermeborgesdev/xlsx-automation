import * as utils from "./utils.js";
import * as api from "./api.js";


//esconde o botao processar quando abrir, e somente habilita quando possuir algum arquivo pra editar
document.getElementById('botao').style.visibility = 'hidden';
const upload = document.getElementById('upload_arquivos');

upload.addEventListener('change', verificaPlanilha)
//verifica se tiver alguma planilha pra editar ele vai habilitar o botao de processa, se não constinua oculto
function verificaPlanilha(){
    const botao = document.getElementById('botao');
    if (upload.files && upload.files.length > 0) {botao.style.visibility = 'visible'} else { botao.style.visibility = "hidden" }
}
//essa funcao vai montar o preview da planilha depois de processada e editada
function previewPlanilha(){
    
}

