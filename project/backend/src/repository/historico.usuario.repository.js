    import { connectDB } from "../database/connection.js";
    import sql from "mssql";
    //essa funcao pega o historico de acao do usuario
    export async function Historico(filtro) {
        //inicia conexao com o banco
        const db = await connectDB ();

        function aplicafiltro (filtro) {
            if (filtro.length > 0) {
            //implementar logica pra aplicar filtro pro historico
                const Filtro = ' Where ' + filtro
                return Filtro;
            }
        }      
        
        const result = await db.request().query(
            `select * from HS_HISTORICO ` + aplicafiltro(filtro) || ''
        );

        return result.recordset;
    }

    //essa funcao pega o historico de acao de um usuario especifico 
    export async function HistoricoUsuario(codigo) {
        //inicia conexao com o banco
        const db = await connectDB();

        const result = await db.request().input("codigo", sql.Int, codigo).query(
            `select *
            from
            HS_HISTORICO
            where HS_CODIGO = @codigo`
        );

        return result.recordset;
    }

    //essa funcao registra uma acao do usuario no historico
    export async function registrarHistoricoUS(dados_hitorico){
        //inicia a conexao com o bano
        const db = await connectDB();   
        //passa as informacoes recebidas pra inserir
        const result = await db.request().input("user", sql.Int, dados_hitorico.usuario).
        input("action", sql.VarChar(255), dados_hitorico.acao).
        query(
            // chamar procedure que faca isso
        );

        return result.rowsAffected[0];
    }    

    // Precisa criar procedure pra exclusao de historico de usuarios antigos