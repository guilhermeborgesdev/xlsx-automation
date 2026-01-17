import { connectDB } from "../database/connection.js";
import sql from "mssql";

export async function auth(login, password) {
    const db = await connectDB();

    const result = await db.request().
    input("login", sql.VarChar(14), login).
    input("password", sql.VarChar(32), password).
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


