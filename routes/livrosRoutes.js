const express = require('express');
const router = express.Router();
const Livro = require("../models/livrosModel");

router.post('', async function (req, res, next) {
    try {
        console.log("Register livro ");
        let livro = new Livro();
        livro.id = req.body.id;
        livro.titulo = req.body.titulo;
        livro.lancamento = req.body.lançamento;
        livro.volume =req.body.volume; 
        let result = await Livro.register(livro);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});