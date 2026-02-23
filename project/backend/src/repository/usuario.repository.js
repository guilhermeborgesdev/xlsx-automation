import { connectDB } from "../database/connection.js";
import sql from "mssql";

//aqui busca os dados de todos os usuarios
export async function getUsuarios() {
    //inica conexao com o banco
    const db = await connectDB();

    const result = await db.request().query(
        `select top 15  
        US_CODIGO as CODIGO,
        US_NOME as NOME,
        US_LOGIN as LOGIN,
        US_PERMISSAO as PERMISSAO
        from US_USUARIOS
        order by US_NOME`
    );

    return result.recordset;
}

//essa funcao busca todos os dados de um usuario especifico
export async function getUsusario(codigo) {
    //inicia conexao com o banco
    const db = await connectDB();
    //passa o codigo do usuario recebido
    const result = await db.request().input("codigo", sql.Int, codigo).query(
        `select
        *
        from
        US_USUARIOS
        where
        US_CODIGO = @codigo`
    );

    return result.recordset;
}

//aqui atualiza as informacoes de um usuario
export async function updtUsusario(codigo, dados_usuario){
    //inica conexao com o banco
    const db = await connectDB();
    //atualiza o nome, senha, login e permissao
    const result = await db.request().input("codigo", sql.Int, codigo).
    input("nome", sql.VarChar(100), dados_usuario.nome).
    input("login", sql.VarChar(14), dados_usuario.login).
    input("permissao", sql.Int, dados_usuario.permissao).
    query(
        `update US_USUARIOS
        set US_NOME = @nome,
        US_LOGIN = @login,
        US_PERMISSAO = @permissao
        where US_CODIGO = @codigo`
    );

    if (result.rowsAffected[0] == 0) {throw new Error ("Usuário não encontrado")}
    return result.rowsAffected[0];
};

//essa funcao deleta um usuario
export async function deleteUsusario(codigo){
    //inicia conexao com o banco
    const db = await connectDB();
    //deleta atraves do codigo recebido
    const result = await db.request().input("codigo", sql.Int, codigo).
    query(
        `delete from US_USUARIOS
        where US_CODIGO = @codigo`
    );

    if (result.rowsAffected[0] == 0) {throw new Error ("Usuário não encontrado")}
    return result.rowsAffected[0];
};

//essa fucnao insere usuarios
export async function insertUsuario(dados_usuario) {
    //inicia conexao com o banco
    const db = await connectDB();
    //insere passando as informacoes do formulario do front
    const result = await db.request().
    input("nome", sql.VarChar(100), dados_usuario.nome).
    input("login", sql.Char(11), dados_usuario.login).
    input("senha", sql.VarChar(500), dados_usuario.senha).
    input("permissao", sql.Int, dados_usuario.permissao).
    query(
        `insert into US_USUARIOS (
        US_NOME, 
        US_LOGIN, 
        US_SENHA,
        US_PERMISSAO)
        output inserted.US_CODIGO
        values (
        @nome, 
        @login,
        @senha, 
        @permissao)
    `); 
    //retorna o codigo do novo usuario inserido por conta do output inserted.US_CODIGO
    return result.rowsAffected[0].US_CODIGO;
}