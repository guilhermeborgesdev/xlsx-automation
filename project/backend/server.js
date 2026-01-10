import dotenv from "dotenv";
dotenv.config({ path: new URL("./.env", import.meta.url) });
import { connectDB } from "./src/database/connection.js";
import express from "express";
import usuarioRoutes from "./src/routes/user/route.usuario.js";
import historicoRoutes from "./src/routes/history/route.historico.js";
import authRoutes from "./src/routes/auth/route.auth.js";   
import cors from "cors";

await connectDB();
const app = express();
app.use(express.json());

app.use(cors({
  origin: ["http://0.0.0.0:5500", "http://localhost:5500"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", usuarioRoutes);
app.use("/api/history", historicoRoutes);

app.use((err, req, res, next) => {
    if (err?.message === "Usuário não encontrado") {
        return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err?.message || "Erro interno" });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
})