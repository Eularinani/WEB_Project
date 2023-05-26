const express = require('express');
const router = express.Router();
const oferta = require("../models/ofertasModel");
const auth = require("../middleware/auth");

router.post('/guardar', async function (req, res, next) {
    try {
        console.log("Register livro ");
        let ofertaData = new oferta();
        ofertaData.nome = req.body.Oferta_nome;
        ofertaData.dia = req.body.Oferta_Dia;
        ofertaData.user_id = req.body.Oferta_user_id;
        ofertaData.livro_id = req.body.Oferta_livro_id;
        ofertaData.imagem_livro = req.body.imagem_livro;
        let result = await oferta.addofert(ofertaData);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


// sustentando a pagina perfil
router.get('/perfil/auth/:id',  async function (req, res, next) {
    try {
        let result = await oferta.getUserofertas(req.params.id);
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
router.get('/inicio/', async function (req, res, next) {
    try {

        console.log("get all inicio route");
        let result = await oferta.getofert();
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

/*route para ir buscar dados de uma oferta*/
router.get('/detalhe-oferta/:idOferta', async function (req, res, next) {
    try {
        let result = await oferta.getEncomendaOFERTA(req.params.idOferta);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});






module.exports = router;