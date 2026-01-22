import * as spreadsheet from "../../repository/historico.planilha.repository.js";
import { Router } from "express";


const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const history = await spreadsheet.HistoricoPlanilhas();
        res.status(200).json({history})
    } catch (error) {
        next(error)
    }
});

router.get("/:codigo", async (req, res, next) => {
    try {
        const user = await spreadsheet.HistoricoUsuario(req.params.codigo);
        res.status(200).json({user})
    } catch (error) {
        next(error)
    }
});


router.post("/", async (req, res, next) => {
    try {
        const id = await spreadsheet.registrarHistoricoHP(req.body);
        res.status(201).json({ id });
    } catch (error) {
        next(error)
    }
});

router.post("/", async (req, res, next) => {
    try {
        const id = await spreadsheet.updtHistoricoPlanilha(req.body);
        res.status(201).json({ id });
    } catch (error) {
        next(error)
    }
});


export default router;