require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

require("./src/config/passport")
const app = express();

app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(cors({
  origin: "http://localhost:5173", // ou a porta do seu frontend
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

// Rotas
app.use('/api/auth', require('./src/routes/UserRoutes'));
app.use('/api/leads', require('./src/routes/LeadsRoutes'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});