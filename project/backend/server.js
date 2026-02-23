//aqui importa o dotenv, que vai servir pra pegar as config do .env
import dotenv from "dotenv";
dotenv.config({ path: new URL("./.env", import.meta.url) });
//aqui pega a funcao que inicia a conexao com o banco
import { connectDB } from "./src/database/connection.js";

import express from "express";
//aqui importa o caminho das rotas das apis
import usuarioRoutes from "./src/routes/user/route.usuario.js";
import historicoRoutes from "./src/routes/history/route.historico.js";
import planilhasRoutes from "./src/routes/history/route.history.planilha.js";
import authRoutes from "./src/routes/auth/route.auth.js";   
import cors from "cors";

//aqui faz a conexao com o banco
await connectDB();
//aqui inicia o express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//aqui libera a politica de cors
app.use(cors({
  origin: ["http://0.0.0.0:5500", "http://localhost:5500"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

//aqui define as rotas das apis
app.use("/api/auth", authRoutes);
app.use("/api/users", usuarioRoutes);
app.use("/api/history", historicoRoutes);
app.use("/api/planilhas", planilhasRoutes)
    
app.use((err, req, res, next) => {
    if (err?.message === "Usuário não encontrado") {
        return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err?.message || "Erro interno" });
});

//aqui inicia pra ouvir na porta 3000 as requisicoes, pega no .env ou define direto a 3000
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
})