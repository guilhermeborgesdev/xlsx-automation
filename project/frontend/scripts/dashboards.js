import * as api from "./api.js"

const dashboard_geral = document.getElementById("dash_geral");
const dashboard_individual = document.getElementById("dash_individual");

try{
    const dados_dash_geral = await api.HistoricoPlanilhas();

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
    console.log('erro ao carregar usuarios' + e);
}