const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const router = jsonServer.router(
    path.join(__dirname, 'db.json')
);

const middlewares = jsonServer.defaults();

app.use(middlewares);

app.use('/api', router);

app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
