import * as user from "../../repository/usuario.repository.js";
import { Router } from "express";

const router = Router();

//define que a chamada é um get
router.get("/", async (req, res, next) => {
    try {
        //chama a funcao que busca todos os usuarios
        const users = await user.getUsuarios();
        res.status(200).json({users})
    } catch (error) {
        next(error)
    }
});

//define que a chamada é um get
router.get("/:codigo", async (req, res, next) => {
    try {
        //chama a funcao que busca dados de um usuario especifico
        const user = await user.getUsusario(req.params.codigo);
        res.status(200).json({user})
    } catch (error) {
        next(error)
    }
});

//define que a chamada é um post
router.post("/", async (req, res, next) => {
    try {
        //chama a funcao que insere um usuario
        const id = await user.insertUsuario(req.body);
        res.status(201).json({ id });
    } catch (error) {
        next(error)
    }
});

//define que a chamada é um put
router.put("/:codigo", async (req, res,next) => {
    try {
        //chama a funcao que atualiza os dados de um usuario
        const update = await user.updtUsusario(req.params.codigo, req.body);
        res.status(200).json({update})
    } catch (error) {
        next(error)
    }
});

//define que a chamada é um delete
router.delete("/:codigo", async (req, res, next) => {
    try{
        //chama a funcao que deleta um usuario
        const deleted = await user.deleteUsusario(req.params.codigo);
        res.status(200).json({deleted})
    } catch (error) {
        next(error)
    }
})

export default router;