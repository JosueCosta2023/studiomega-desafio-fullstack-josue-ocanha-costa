const express = require("express");
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const authenticateJWT = require("../middlewares/auth");
const prisma = new PrismaClient();


router.get("/", authenticateJWT, async (req, res)=> {
    try {
        const leads = await prisma.lead.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                userId: true,
            }
        })

        res.status(200).json(leads)
        
    } catch (error) {
        console.error("Falha ao listar leads", error);
        res.status(500).json({error: "Erro de servidor ao listar leads"})
    }
})

router.post("/", authenticateJWT, async (req, res) => {
    try {
        const {name, email, phone, message} = req.body;

        if(!name || !email || !phone){
            return res.status(400).json({error: "Nome, Email e telefone são obrigatorios."})
        }

        const lead = await prisma.lead.create({
            data: {name, email, phone, message, userId: req.user.id}
        })

        res.status(201).json({message: "Lead cadastrado com sucesso!", lead})
        
    } catch (error) {
        console.error("Falha ao cadastrar novo lead", error);
        res.status(500).json({error: "Falha de servidor ao cadastrar novo lead"})
    }
})


router.delete("/:id", authenticateJWT, async (req, res) => {
    try {
        const id = Number(req.params.id);

       const lead =  await prisma.lead.findUnique({ where: {id}})

       if(!lead){
        return res.status(404).json({error: "Lead não encontrado"})
       }

       if(lead.userId !== req.user.id){
        return res.status(403).json({error: "Você não tem permissão para deletar este lead"})
       }

       await prisma.lead.delete({
        where: {
            id
        }
       })

        res.status(204).send()
        
    } catch (error) {
        console.error("Falha ao deletar lead", error)
        res.status(500).json({error: "Falha interna ao deletar lead"})
    }
})

router.patch("/:id",authenticateJWT, async (req, res) => {
    try {

        const id = Number(req.params.id)
        const {name, email, phone, message} = req.body;

        // Obter lead do banco
        const lead = await prisma.lead.findUnique({where: {id}})

        if(!lead){
            return res.status(404).json({error: "Lead não encontrado"})
        }

        // Valida autenticação do usuario
        if(lead.userId !== req.user.id){
            return res.status(403).json({error: "Você não tem autorização para atualizar este lead."})
        }

        const data = {};

        if(name) data.name = name;
        if(email) data.email = email;
        if(phone) data.phone = phone;
        if(message) data.message = message;

        // Validação de campos
        if(Object.keys(data).length === 0){
            return res.status(422).json({error: "Envie pelo menos um campo para atualizar."})
        }

        await prisma.lead.update({
            where: {id},
            data
        })

        res.status(204).send()

        
    } catch (error) {
        console.error("Falha ao atualizar lead")
        res.status(500).json({error: "Falha interna ao atualizar Lead"})
    }
})


module.exports = router