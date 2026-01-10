import * as user from "../../repository/usuario.repository.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const users = await user.getUsuarios();
        res.status(200).json({users})
    } catch (error) {
        next(error)
    }
});

router.get("/:codigo", async (req, res, next) => {
    try {
        const user = await user.getUsusario(req.params.codigo);
        res.status(200).json({user})
    } catch (error) {
        next(error)
    }
});


router.post("/", async (req, res, next) => {
    try {
        const id = await user.insertUsuario(req.body);
        res.status(201).json({ id });
    } catch (error) {
        next(error)
    }
});

router.put("/:codigo", async (req, res,next) => {
    try {
        const update = await user.updtUsusario(req.params.codigo, req.body);
        res.status(200).json({update})
    } catch (error) {
        next(error)
    }
});

router.delete("/:codigo", async (req, res, next) => {
    try{
        const deleted = await user.deleteUsusario(req.params.codigo);
        res.status(200).json({deleted})
    } catch (error) {
        next(error)
    }
})

export default router;