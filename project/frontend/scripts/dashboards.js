import * as api from "./api.js"

const dashboard_geral = document.getElementById("dash_geral");
const dashboard_individual = document.getElementById("dash_individual");

try{
    const dados_dash_geral = await api.HistoricoPlanilhas();

    const historico = dados_dash_geral.history;
    var labels = historico.map(i => i.UsuarioNome);
    var TotalPlanilhas = historico.map(i => i.TotalPlanilhas);
    
    new Chart(dashboard_geral, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Planilhas Editadas",
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
}