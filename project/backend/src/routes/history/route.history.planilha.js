import * as planilha from "../../repository/historico.planilha.repository.js";
import { Router } from "express";


const router = Router();

//define que a chamada é um get
router.get("/", async (req, res, next) => {
    try {
        //chama a funcao que busca o historico geral
        const history = await planilha.HistoricoPlanilhas();
        res.status(200).json({history})
    } catch (error) {
        next(error)
    }
});

//define que a chamada é um get
//diferencia as funcoes por conta que é passado o codigo depois da barra 
router.get("/:codigo", async (req, res, next) => {
    try {
        //chama a funcao que pega o historico de um usuario especifico
        const history = await planilha.HistoricoPlanilhasUsuarios(req.params.codigo);
        res.status(200).json({history})
    } catch (error) {
        next(error)
    }
});


//define que a chamada é um post
router.post("/", async (req, res, next) => {
    try {
        //chama a funcao que registra o historico na tabela de historico
        const id = await planilha.registrarHistoricoHP(req.body);
        res.status(201).json({ id });
    } catch (error) {
        next(error)
    }
});

export default router;