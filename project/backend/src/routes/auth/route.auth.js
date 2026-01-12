import { auth } from "../../repository/auth.repository.js";
import { Router } from "express";


const router = Router();

router.post("/", async (req, res, next) => {
    try {
        const user = await auth(req.body.login, req.body.password);
        if (user.length === 0) {
            return res.status(400).json({ error: "Login ou senha inválidos" });
        }
        res.json({ user: user[0] });

    } catch (error) {
        next(error)
    };
})

export default router;  