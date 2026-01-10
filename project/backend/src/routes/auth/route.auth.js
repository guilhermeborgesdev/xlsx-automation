import { auth } from "../../repository/auth.repository.js";
import { Router } from "express";


const router = Router();

router.post("/", async (req, res, next) => {
    try {
        const autenticate = await auth(req.body.login, req.body.password);
        if (autenticate.length === 0) {
            return res.status(401).json({ error: "Login ou senha inválidos" });
        }
        res.json({ autenticate: autenticate[0] });

    } catch (error) {
        next(error)
    };
})

export default router;