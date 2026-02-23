import * as api from "./api.js"

//aqui ele va buscar os dois dashboards existentes 
const dashboard_geral = document.getElementById("dash_geral");
const dashboard_individual = document.getElementById("dash_individual");
//aqui ele vai buscar os dados de sessao do usuario
const sessao = await api.GetDadosLogin();

try{
    //ele vai buscar os dados pra montar a planilha com dados gerais
    const dados_dash_geral = await api.HistoricoPlanilhas();
    //vai buscar somente os dados do history
    const historico = dados_dash_geral.history;
    //se tiver historico ele vai montar o dash
    if (historico) {
        var labels = historico.map(i => i.UsuarioNome);
        var TotalPlanilhas = historico.map(i => i.TotalPlanilhas);
        
        new Chart(dashboard_geral, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Planilhas Editadas',
                    data: TotalPlanilhas,
                    backgroundColor: 'rgb(0, 38, 255)',
                    borderColor: 'rgb(11, 35, 255)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: { y: { beginAtZero: true }}
            }
        })
    } else {
        //se não tiver ele mostra a mensagem dizendo que nao possui historico
        document.getElementById('dash_msg_geral').innerHTML = '<p><strong>NENHUMA PLANILHA EDITADA</strong></p>';
    }
} catch (e){
    console.log ('erro ao carregar usuarios' + e);
}

try {
    //vai buscar o historico de planilahs do usuario
    const dados_dash_individual = await api.HistoricoPlanilhasUsuarios(sessao.codigo);
    const historico = dados_dash_individual.history;
    //se possuir historico vai montar o dash
    if (historico){
        var TotalPlanilhas = historico.map(i => i.TotalPlanilhas);

        new Chart(dashboard_individual, {
            type: 'bar',
            data: {
                labels: ['Suas Edições'],
                datasets: [{
                    labels: '',
                    data: TotalPlanilhas,
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderColor: 'rgb(11, 35, 255)',
                    borderWidth: 1
                }]      
            },
            options: {
                scales: { y: { beginAtZero: true}}
            }
        })
    } else {
        //se não possuir ele mostra a mensagem dizendo que não possuir historico
        document.getElementById('dash_msg_indivudal').innerHTML = '<p><strong>NENHUMA PLANILHA EDITADA</strong></p>';
    }
} catch (e) {   
    console.log('erro ao carregar usuarios' + e);
}