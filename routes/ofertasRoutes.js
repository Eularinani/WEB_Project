const express = require('express');
const router = express.Router();
const Livro = require("../models/ofertasModel");

router.post('', async function (req, res, next) {
    try {
        console.log("Register livro ");
        let oferta = new Oferta();
        oferta.id = req.body.Oferta_id;
        oferta.nome = req.body.Oferta_nome;
        oferta.dia = req.body.Oferta_Dia;
        oferta.contra_p = req.body.Oferta_contaP;
        oferta.user_id = req.body.Oferta_user_id;
        oferta.livro_id = req.body.Oferta_livro_id;
        let result = await Oferta.register(oferta);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});