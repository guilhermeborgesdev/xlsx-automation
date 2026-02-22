import * as user from "../../repository/historico.usuario.repository.js";
import { Router } from "express";

const router = Router();

//define que a chamada é um get
router.get("/", async (req, res, next) => {
    try {
        //chama a funcao que busca todo o historico de acoes dos usuarios 
        const history = await user.Historico();
        res.status(200).json({history})
    } catch (error) {
        next(error)
    }
});

//define que a chamada é um get
//diferencia as funcoes por conta que é passado o codigo depois da barra 
router.get("/:codigo", async (req, res, next) => {
    try {
        const users = await user.HistoricoUsuario(req.params.codigo);
        res.status(200).json({users})
    } catch (error) {
        next(error)
    }
});

//aqui define que a chamada é um post
router.post("/", async (req, res, next) => {
    try {
        //aqui chama a funcao que registra no historico a acao 
        const id = await user.registrarHistoricoUS(req.body);
        res.status(201).json({ id });
    } catch (error) {
        next(error)
    }
});

export default router;