import * as api from "./api.js"

const dashboard_geral = document.getElementById("dash_geral");
const dashboard_individual = document.getElementById("dash_individual");
const codigo_usuario = await api.GetDadosLogin();

try{
    const dados_dash_geral = await api.HistoricoPlanilhas();

<<<<<<< Updated upstream
=======
    const historicoGeral = dados_dash_geral.history;
    var labels = historicoGeral.map(i => i.UsuarioNome);
    var TotalPlanilhas = historicoGeral.map(i => i.TotalPlanilhas);
    
>>>>>>> Stashed changes
    new Chart(dashboard_geral, {
        type: "bar",
        data: {
            labels: dados_dash_geral.Planilha,
            datasets: {
                label: "Planilhas Editadas",
                data: dados_dash_geral.Data_Planilhas,
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: 'rgb(11, 35, 255)',
                borderWidth: 1
            }
        },
        options: {
            scales: { y: { beginAtZero: true }}
        }
    })
} catch (e){
<<<<<<< Updated upstream
    console.log('erro ao carregar usuarios' + e);
=======
    console.log ('erro ao carregar usuarios' + e);
}

try{
    const dados_dash_individual = await api.HistoricoPlanilhasindividual(codigo_usuario.codigo);

    const historicoIndividual = dados_dash_individual.historicoUser;
    var datalabels = historicoIndividual.map(i => i.DataPlanilha);
    var TotalPlanilhas = historicoIndividual.map(i => i.TotalPlanilhas);
    
    new Chart(dashboard_individual, {
        type: "bar",
        data: {
            labels: datalabels,
            datasets: [{
                label: "Qntd Planilhas editadas/Data Edição",
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
} catch (e){
    console.log ('erro ao carregar usuarios' + e);
>>>>>>> Stashed changes
}