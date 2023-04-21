//import das informações que vem da base de dados
const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");

function dbOfertaTooferta(dbOferta)  {
    let oferta = new Ofert();
    oferta.id = dbOferta.Oferta_id;
    oferta.nome = dbOferta.Oferta_nome;
    oferta.dia = dbOferta.Oferta_Dia;
    oferta.contra_p = dbOferta.Oferta_contaP;
    oferta.user_id = dbOferta.Oferta_user_id;
    oferta.livro_id = dbOferta.Oferta_livro_id;
    return oferta;
}

function dbtranzacaoTotrans(dbtrazacao)  {
    return new Trans(trans.id,trans.nome,trans.user_id,trans.troca_id);
}

class Trans{
    constructor(id,nome,iduser,idtroca,idOfet ){
        this.id=id
        this.name=nome
        this.iduser=iduser
        this.idtroca=idtroca
        this.idOfet=idOfet
}}

class Ofert{
        constructor(id,nome,dia,contra_p,user,livro){
            this.id=id
            this.name=nome
            this.dia=dia
            this.contra_p=contra_p
            this.user_id=user
            this.livro_id=livro
    }
    
    //add ofertas
    static async addofert(oferta){
            try {
                let dbResult =
                    await pool.query("Select * from oferta where Oferta_id=$1", [oferta.id]);
                let dbofertas = dbResult.rows;
                if (dbofertas.length)
                    return {
                        status: 400, result: [{
                            location: "body", param: "id",
                            msg: "Essa oferta já foi feita"
                        }]
                    }; 
                dbResult = await pool.query(`Insert into oferta ((Oferta_nome, Oferta_foto,Oferta_livro_id,Oferta_user_id, Oferta_Dia)
                        values ($1,$2,$3,$4,$5)`, [oferta.name, oferta.foto, oferta.livro_id, oferta.user_id, oferta.dia]);
                return { status: 200, result: {msg:"A sua Oferta foi feita"}} ;
            } catch (err) {
                console.log(err);
                return { status: 500, result: err };
            }
    }





    //lista de oferttas 
    static async getofert(){
        try {
            let dbResult = await pool.query("Select * from Oferta");
            let dbofertas = dbResult.rows;
            let ofertas = [];
            for (let dbofer of dbofertas) {
                ofertas.push(dbProdToProd(dbofer));
            }
            return {status:200, result: ofertas};
        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "ofertas não encotradas"}};
        }
    
    }



}
module.exports = Ofert;
