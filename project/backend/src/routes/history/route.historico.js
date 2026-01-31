import * as user from "../../repository/historico.usuario.repository.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const history = await user.Historico();
        res.status(200).json({history})
    } catch (error) {
        next(error)
    }
});

router.get("/:codigo", async (req, res, next) => {
    try {
        const users = await user.HistoricoUsuario(req.params.codigo);
        res.status(200).json({users})
    } catch (error) {
        next(error)
    }
});


router.post("/", async (req, res, next) => {
    try {
        const id = await user.registrarHistoricoUS(req.body);
        res.status(201).json({ id });
    } catch (error) {
        next(error)
    }
});

export default router;