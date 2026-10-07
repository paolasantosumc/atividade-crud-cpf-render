const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

// JSON Server
const router = jsonServer.router(
    path.join(__dirname, 'db.json')
);

const middlewares = jsonServer.defaults();

// Middlewares
app.use(middlewares);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// API
app.use('/api', router);

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
