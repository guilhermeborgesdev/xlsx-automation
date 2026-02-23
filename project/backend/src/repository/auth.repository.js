import { connectDB } from "../database/connection.js";
import sql from "mssql";

export async function auth(login, password) {
    //aqui inicia a conexao com o banco
    const db = await connectDB();
    
    //aqui vai buscar e ver se existe algum usuario com as informacoes passadas
    const result = await db.request().
    //aqui vai passar o login do usuario
    input("login", sql.VarChar(14), login).
    //aqui vai passar a senha do usuario
    input("password", sql.VarChar(32), password).
    //aqui vai realizar a query no banco
    query(
        `select
        US_CODIGO,
        US_NOME,
        US_LOGIN,
        US_PERMISSAO
        from
        US_USUARIOS
        where
        US_LOGIN = @login
        and
        US_SENHA = @password`
    );

    return result.recordset;
}


