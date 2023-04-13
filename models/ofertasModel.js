//import das informações que vem da base de dados
const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");
const saltRounds = 10; 

function dbOfertaTooferta(dbOferta)  {
    let oferta = new Oferta();
    oferta.id = dbOferta.Oferta_id;
    oferta.nome = dbOferta.Oferta_nome;
    oferta.dia = dbOferta.Oferta_Dia;
    oferta.contra_p = dbOferta.Oferta_contaP;
    oferta.user_id = dbOferta.Oferta_user_id;
    oferta.livro_id = dbOferta.Oferta_livro_id;
    return oferta;
}
class Oferta {
    constructor(id,nome,dia,contra_p,user,livro){
        this.id=id
        this.name=nome
        this.dia=dia
        this.contra_p=contra_p
        this.user_id=user
        this.livro_id=livro
}
    static async descbook(oferta){
    }
}