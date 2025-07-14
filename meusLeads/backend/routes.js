const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcryptjs")
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();


router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}))

router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/login"}), (req, res) => {
    res.json({user: req.user})
})


router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const existinUser = await prisma.user.findUnique({where: {email}})

        if(existinUser){
            return res.status(400).json({error: "Email já cadastrado"});
        }

        const hash = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {name, email, password: hash}
        })

        res.status(201).json({user})

    } catch (error) {
        console.error("Erro ao registar usuario", error);
        res.status(500).json({erros: "Erro ao registrar usuario"})
    }
})

router.get("/users", async (req, res) => {
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
        console.error("Falha ao buscar usuarios: ",error);
        res.status(500).json({error: "Falha ao buscar usuarios"})
    }
})

router.delete("/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.user.delete({where: {id}})

        res.status(200).json({message: "Usuario deletado com sucesso", id})
        
    } catch (error) {
        console.error("Falha ao deletar usuario:", error);
        res.status(500).json({error: "Falha ao deletar usario"})
    }
})


router.put("/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const {name, email, password} = req.body;

        const data = {};

        if(name) data.name = name;
        if(email) data.email = email;

        if(password) {
            const bcrypt = require("bcryptjs")
            data.password = await bcrypt.hash(password, 10)
        }


        const user = await prisma.user.update({
            where: {id},
            data
        })
        

        res.status(200).json({message: "Usuario atualizado com sucesso", id})
        
    } catch (error) {
        console.error("Falha ao atualizar dados do usuario:", error);
        res.status(500).json({error: "Falha ao atualizar dados do usario"})
    }
})

module.exports = router


