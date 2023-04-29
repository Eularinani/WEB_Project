const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const Livro = require("../models/livrosModel.js");
const { Result } = require('express-validator');

router.post('', async function (req, res, next) {
    try {
        console.log("Register livro ");
        let livro = new Livro();
        livro.id = req.body.id;
        // adicionar capa
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

// Get information about the authenticated user (only the name)
router.get('/auth',auth.verifyAuth,  async function (req, res, next) {
    try {
        //console.log("Get authenticated user");
        let livro = new Livro();
        let result = await Livro.getbooks();
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        
        // sendig only the name
        res.status(result.status).send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
module.exports = router;