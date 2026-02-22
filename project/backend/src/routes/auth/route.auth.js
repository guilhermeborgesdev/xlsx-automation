import { auth } from "../../repository/auth.repository.js";
import { Router } from "express";
//inicia a rota do express
const router = Router();
//define que a chamada é um get
router.get("/", async (req, res, next) => {
    try {
        //chama a funcao de autenticacao do usuario
        const user = await auth(req.body.login, req.body.password);
        if (user.length === 0) {
            //se for 0 o esta errado a senha ou login
            return res.status(400).json({ error: "Login ou senha inválidos" });
        }
        res.json({ user: user[0] });

    } catch (error) {
        next(error)
    };
})
//exporta o router
export default router;  