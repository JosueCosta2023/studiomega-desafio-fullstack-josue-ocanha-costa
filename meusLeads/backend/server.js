require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');

require("./src/config/passport")

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Rotas
app.use('/api/auth', require('./routes'));
// app.use('/api/leads', require('./src/routes/leadRoutes'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});