const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcryptjs")
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const authenticateJWT = require("../middlewares/auth");


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    res.json({ user: req.user })
})

router.post("/users", async (req, res) => {
    const { name, email, password } = req.body;

    // Validaçao
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Todos os campos sao obrigatorios." })
    }

    try {
        const existinUser = await prisma.user.findUnique({ where: { email } })

        if (existinUser) {
            return res.status(400).json({ error: "Email já cadastrado" });
        }

        const hash = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: { name, email, password: hash }
        })

        res.status(201).json({ message: "Usuario criado com sucesso:", id: user.id })

    } catch (error) {
        console.error("Algum erro desconhecido no servidor", error);
        res.status(500).json({ erros: "Algum erro desconhecido no servidor" })
    }
})

router.get("/users", authenticateJWT, async (req, res) => {
    try {

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                googleId: true
            }
        });

        res.json(users)

    } catch (error) {
        console.error("Falha ao buscar usuarios: ", error);
        res.status(500).json({ error: "Falha ao buscar usuarios" })
    }
})

router.delete("/users/:id", authenticateJWT, async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.user.delete({ where: { id } })

        res.status(204).send()

    } catch (error) {
        console.error("Falha ao deletar usuario:", error);
        res.status(500).json({ error: "Falha ao deletar usario" })
    }
})

router.put("/users/:id", authenticateJWT, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, email, password } = req.body;

        const data = {};

        if (name) data.name = name;
        if (email) data.email = email;

        if (password) {
            const bcrypt = require("bcryptjs")
            data.password = await bcrypt.hash(password, 10)
        }


        const user = await prisma.user.update({
            where: { id },
            data
        })


        res.status(204).send()

    } catch (error) {
        console.error("Falha ao atualizar dados do usuario:", error);
        res.status(500).json({ error: "Falha ao atualizar dados do usario" })
    }
})

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Email e senha sao obrigatorios." })
    }

    try {

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return res.status(401).json({ error: "Usuario nao encontrado" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ error: "Senha Incorreta" });
        }

        // geração do token
        const token = jwt.sign(
            // Payload
            { id: user.id, email: user.email },
            // Chave
            process.env.JWT_SECRET,
            // Tempo de expiração
            { expiresIn: "1h" }
        )

        res.status(200).json({ message: "Login realizado com sucesso: ", token, user: { id: user.id, name: user.name, email: user.email } })


    } catch (error) {
        console.error("Falha ao realizar o login:", error)
        res.status(500).json({ error: "Falha interna ao tentar realizar o login" })
    }
})

module.exports = router


