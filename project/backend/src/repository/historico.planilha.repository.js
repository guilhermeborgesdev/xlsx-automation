    import { connectDB } from "../database/connection.js";
    import sql from "mssql";

    export async function Historico() {
        const db = await connectDB ();

        const result = await db.request().query(
        )

        return result.recordset;
    }

    export async function HistoricoUsuario(codigo) {
        const db = await connectDB();

        const result = await db.request().input("codigo", sql.Int, codigo).query(
            `select *
            from
            HP_HISTORICO_PLANILHAS
            where HP_USCODIGO = @codigo`
        );

        return result.recordset;
    }

    export async function registrarHistoricoHP(dados_hitorico_planilha){
        const db = await connectDB();
        
        const result = await db.request().input("codigousuario", sql.Int, dados_hitorico_planilha.usuario).
        input("nome_planilha", sql.VarChar(255), dados_hitorico_planilha.planilha).
        input("nomeusuario", sql.VarChar(255), dados_hitorico_planilha.name).
        input("status", sql.VarChar(100), dados_hitorico_planilha.status).
        input("error", sql.VarChar(500), dados_hitorico_planilha.error).
        query(
            `insert into HP_HISTORICO_PLANILHAS(
            HP_USCODIGO,
            HP_NOMEPLANILHA,
            HP_USNOME,
            HP_LOCALPLANILHA,
            HP_STATUS,
            HP_ERROR
            )
            output inserted.HP_CODIGO
            values(
            @codigousuario,
            @nome_planilha,
            @nomeusuario,
            @status,
            @error
            )`
        );

        return result.rowsAffected[0].HS_SH_CODIGO;
    }

    export async function updtHistoricoPlanilha(codigo, dados_hitorico_planilha){
        const db = await connectDB();

        const result = await db.request().input("codigo", sql.Int, codigo).
        input("status", sql.VarChar(100), dados_hitorico_planilha.status).
        input("error", sql.VarChar(500), dados_hitorico_planilha.error).
        query(
            `update US_HISTORICO_PLANILHAS
            set HP_STATUS = @status,
            HP_ERROR = @error,
            HP_DATA = GETDATE()
            where HP_CODIGO = @codigo`
        );

        if (result.rowsAffected[0] == 0) {throw new Error ("Histórico de planilha não encontrado")}
        return result.rowsAffected[0];
    }
    // Precisa criar procedura pra exclusao de historico de planilhas antigas