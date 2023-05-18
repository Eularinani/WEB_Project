const express = require('express');
const router = express.Router();
const Locais = require("../models/locaisModel");
const { Result } = require('express-validator');



// livros para a select box para poder fazer o formulario
router.get('',  async function (req, res, next) {
    try {
        console.log("Get all livros");
        let result = await Locais.Locais();
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
module.exports = router;