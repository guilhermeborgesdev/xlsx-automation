import * as planilha from "../../repository/historico.planilha.repository.js";
import { Router } from "express";


const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const history = await planilha.HistoricoPlanilhas();
        res.status(200).json({history})
    } catch (error) {
        next(error)
    }
});

router.get("/:codigo", async (req, res, next) => {
    try {
        const history = await planilha.HistoricoPlanilhasUsuarios(req.params.codigo);
        res.status(200).json({history})
    } catch (error) {
        next(error)
    }
});


router.post("/", async (req, res, next) => {
    try {
        const id = await planilha.registrarHistoricoHP(req.body);
        res.status(201).json({ id });
    } catch (error) {
        next(error)
    }
});

router.post("/", async (req, res, next) => {
    try {
        const id = await planilha.updtHistoricoPlanilha(req.body);
        res.status(201).json({ id });
    } catch (error) {
        next(error)
    }
});


export default router;