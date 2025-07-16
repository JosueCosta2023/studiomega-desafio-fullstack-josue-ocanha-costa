# 🧾 Meus Leads - Backend

> API do projeto **Meus Leads**, desenvolvida em Node.js com Express, Prisma e PostgreSQL.

---

## 📦 Repositórios

- 🔗 [Frontend do projeto](https://github.com/seu-usuario/seu-repo/tree/main/meusLeads/frontend)
- 🖥️ Backend: `meusLeads/backend` (você está aqui)

---

## ✅ Pré-requisitos

Antes de iniciar, verifique se você tem instalado:

- [Node.js](https://nodejs.org/) — recomendado versão 18 ou superior  
- [npm](https://www.npmjs.com/) — geralmente já vem com o Node.js  
- [PostgreSQL](https://www.postgresql.org/) — banco de dados compatível com Prisma

---

## 🛠️ Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/JosueCosta2023/studiomega-desafio-fullstack-josue-ocanha-costa.git
   cd seu-repo/meusLeads/backend
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` com o seguinte conteúdo:

   ```env
   DATABASE_URL="sua_string_de_conexao_do_banco"
   JWT_SECRET="um_segredo_seguro"
   GOOGLE_CLIENTE_ID="sua id do google"
   GOOGLE_CLIENT_SECRET="seu segredo do google"
   ```

   > Ajuste os valores conforme seu ambiente.

4. **Configure o banco de dados com Prisma:**

   Gere as migrações e o client do Prisma:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

---

## 🚀 Executando o servidor

- **Modo desenvolvimento (com hot reload):**

  ```bash
  npm run dev
  ```

A API estará disponível em: [http://localhost:3001](http://localhost:3001) (ou na porta definida no seu projeto).

---

## 📜 Scripts disponíveis

| Comando         | Descrição                                |
|-----------------|--------------------------------------------|
| `npm run dev`   | Inicia o servidor com hot reload (nodemon) |


---

## ⚙️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [JWT](https://jwt.io/) (autenticação)
- [Passport](http://www.passportjs.org/) (OAuth)
- [PostgreSQL](https://www.postgresql.org/) (ou outro banco suportado)

---

## 🧠 Contribuindo

Contribuições são bem-vindas!  
Abra uma *issue* ou envie um *pull request* com suas sugestões ou correções.

---

## 📄 Licença

Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT).
