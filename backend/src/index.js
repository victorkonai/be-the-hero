const express = require('express');

//seguranca agora
const cors = require('cors');

const routes = require('./routes');

const app = express();

//fazendo com que todos os frontends tenham acesso ao backend
app.use(cors());

//falando pro express que ele vai converter um objeto json para js
app.use(express.json());
app.use(routes);

/* 
*HTTP
*GET: buscar uma informacao no backend
*POST: criar uma informacao no backend
*PUT: alterar uma informacao no backend
*DELETE: deletar uma informacao no backend
*/

/*
*PARAMETROS
*QUERY: usado para filtos paginacao depois do ?
*Route Params: parametros usados para identificar recursos
*Request Body: corpo da requisicao, utilizado para criar ou alterar recursos
*/

/**
 * SQL
 * NoSQL: MongoDB
 */




app.listen(3333);