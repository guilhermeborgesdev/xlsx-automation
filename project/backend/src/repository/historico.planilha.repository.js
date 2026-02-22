import { connectDB } from "../database/connection.js";
import sql from "mssql";

export async function HistoricoPlanilhas() {
    //inicia a conexao
    const db = await connectDB ();
    //aqui vai buscar todo o hisotrico de planilhas
    const result = await db.request().query(
        `select
        US_CODIGO        as UsuarioCodigo,
        US_NOME          as UsuarioNome,
        COUNT(*)         as TotalPlanilhas
        from HP_HISTORICO_PLANILHAS 
        join US_USUARIOS ON US_CODIGO = HP_USCODIGO
        group by US_CODIGO, US_NOME
        order by TotalPlanilhas DESC;
        `
    );

    return result.recordset;
}   

export async function HistoricoPlanilhasUsuarios(id) {
    //inicia conexao com o banco
    const db = await connectDB();
    //aqui vai buscar hisotrico de um usuario especifico
    const result = await db.request().
    //aqui vai passar o id do usuario recebido
    input("id", sql.Int, id).query(
        `select 
        US_CODIGO        as UsuarioCodigo,
        US_NOME          as UsuarioNome,
        count(*)         as TotalPlanilhas
        from HP_HISTORICO_PLANILHAS 
        join US_USUARIOS ON US_CODIGO = HP_USCODIGO
        where US_CODIGO = @id
        group by US_CODIGO, US_NOME
        order by TotalPlanilhas desc;
        `
    )
}

//essa funcao é chamada pra adicioanr um registro no hisotrico de planilhas 
export async function registrarHistoricoHP(dados_hitorico_planilha){
    //inicia conexao com o banco
    const db = await connectDB();
    //aqui vai passar os dados pra inserir no banco
    const result = await db.request().input("codigousuario", sql.Int, dados_hitorico_planilha.usuario).
    input("nome_planilha", sql.VarChar(255), dados_hitorico_planilha.planilha).
    input("local_planilha", sql.Varchar(100), dados_hitorico_planilha.local_planilha)
    input("status", sql.VarChar(100), dados_hitorico_planilha.status).
    input("error", sql.VarChar(500), dados_hitorico_planilha.error).
    query(
        `insert into HP_HISTORICO_PLANILHAS(
        HP_USCODIGO,
        HP_NOMEPLANILHA,
        HP_LOCALPLANILHA,
        HP_STATUS,
        HP_ERROR
        )
        output inserted.HP_CODIGO
        values(     
        @codigousuario,
        @nome_planilha,
        @local_planilha,
        @status,
        @error
        )`
    );
    //aqui vai retornar somente o HP_CODIGO por conta do output inserted.HP_CODIGO
    return result.rowsAffected.HP_CODIGO;
}

// Precisa criar procedura pra exclusao de historico de planilhas antigas