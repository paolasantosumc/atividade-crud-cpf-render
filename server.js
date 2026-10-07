const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

app.use(middlewares);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Páginas do CRUD
app.use('/post', express.static(path.join(__dirname, 'post')));
app.use('/get', express.static(path.join(__dirname, 'get')));
app.use('/put', express.static(path.join(__dirname, 'put')));
app.use('/delete', express.static(path.join(__dirname, 'delete')));
app.use('/css', express.static(path.join(__dirname, 'css')));

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// JSON Server fornece as operações REST em /pessoas
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
