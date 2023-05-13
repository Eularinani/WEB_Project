const express = require('express');
const router = express.Router();
const oferta = require("../models/ofertasModel");
const auth = require("../middleware/auth");

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


// sustentando a pagina perfil
router.get('/auth/:id',auth.verifyAuth,  async function (req, res, next) {
    try {
        let result = await oferta.getUserofertas(req.user.id);
        if(result.status != 200){
            res.status(result.status).send(result.result);
            return;}
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


//buscando uma oferta atraves do seu id
router.get('/auth/:id',auth.verifyAuth,  async function (req, res, next) {
    try {
        let result = await oferta.getEncomendaOFERTA(req.oferta.id);
        if(result.status != 200){
            res.status(result.status).send(result.result);
            return;}
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


//sustenta a pagina iniciuio
router.get('', async function (req, res, next) {
    try {
        console.log("get all oferta");
        let result = await oferta.getofert();
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});






module.exports = router;