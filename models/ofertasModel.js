//import das informações que vem da base de dados
const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");

function dbOfertaTooferta(dbOferta)  {
    let oferta = new Ofert();
    oferta.id = dbOferta.oferta_id;
    oferta.titulo = dbOferta.titulo;
    oferta.dia = dbOferta.oferta_dia;
    oferta.user_id = dbOferta.usr_id;
    oferta.livro_id = dbOferta.livro_id;
    oferta.imagem_livro = dbOferta.livr_capa;
    oferta.nome_oferta = dbOferta.oferta_nome;
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
        constructor(id,titulo,dia,contra_p,user,livro, imagem, nome_oferta){
            this.id=id
            this.titulo=titulo
            this.dia=dia
            this.user_id=user
            this.livro_id=livro
            this.imagem_livro = imagem
            this.nome_oferta = nome_oferta
    }
    
    //add ofertas
    static async addofert(oferta){
            try {
                dbResult = await pool.query(`Insert into oferta ((Oferta_nome, Oferta_foto,Oferta_livro_id,Oferta_user_id, Oferta_Dia)
                        values ($1,$2,$3,$4,$5)`, [oferta.name, oferta.foto, oferta.livro_id, oferta.user_id, oferta.dia]);
                return { status: 200, result: {msg:"A sua Oferta foi feita"}} ;
            } catch (err) {
                console.log(err);
                return { status: 500, result: err };
            }
    }

  // buscando todas as ofertas de um user
    static async getUserofertas(userId) {
        try {
            let dbResult = await pool.query(
                'SELECT Oferta_nome, Oferta_foto, Oferta_Dia, Titulo, Livr_capa, Livro_Volume, Transacao_nome, Livro_id, usr_id, oferta_id '+
                'FROM oferta '+
                'INNER JOIN livro ON oferta.oferta_livro_id = livro.livro_id '+
                'INNER JOIN transacao ON oferta.oferta_id = transacao.Transacao_Oferta_id '+
                'INNER JOIN appuser ON oferta.oferta_user_id = appuser.usr_id '+
                'WHERE oferta.oferta_user_id = $1', [userId]);
            let dbOfertas = dbResult.rows;
            if(!dbOfertas || !dbOfertas.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "id",
                        msg: "Essa oferta já foi feita"
                    }]
                };
            let oferta = [];
            for (let dbOferta of dbOfertas) {
                oferta.push(dbOfertaTooferta(dbOferta));
            }

            return {status:200, result: oferta};

        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }
    
//FONECENDO INFO SOBRE UMA OFERTA
    static async getEncomendaOFERTA(ofertaID) {
        try {
            let dbItems = await pool.query(
                `select  Oferta_nome,Oferta_Dia,Titulo,Livr_capa,usr_name
                FROM oferta
                INNER JOIN livro on oferta.oferta_livro_id=livro.livro_id
                INNER JOIN appuser on oferta.oferta_user_id=appuser.usr_id
                WHERE oferta_id = $1`,  [ofertaID]);
            let dbItem = dbItems.rows && dbItems.rows.length && dbItems.rows[0];
            console.log(dbItems)
            console.log("ofeerta")
            console.log(dbItem);
            if(!dbItem)
                return {
                    status: 400, result: [{
                        location: "body", param: "id",
                        msg: "Essa oferta já foi feita"
                    }]
                }; 
            let ofertas ={};
            ofertas.nome = dbItem.oferta_nome;
            ofertas.dia = dbItem.oferta_dia;
            ofertas.titulo = dbItem.titulo;
            ofertas.capa = dbItem.livr_capa;
            ofertas.nome_utilizador = dbItem.usr_name;
            // ofertas.nome_transacao = dbItem.transacao.nome;

            console.log("ofertas", ofertas)
            return {status:200, result: ofertas};

        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }


    //lista de oferttas 
    static async getofertaOld(){
        try {
            let dbResult = await pool.query("Select * from Oferta");
            let dbofertas = dbResult.rows;
            let ofertas = [];
            console.log(ofertas);
/*            for (let dbofer of dbofertas) {
                ofertas.push(dbProdToProd(dbofer));
            }*/
            return {status:200, result: ofertas};
        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "ofertas não encotradas"}};
        }
    
    }





     //lista de oferttas para pagina inicial
    static async getofert(){
        try {
            let dbResult = await pool.query('select Oferta_id,Oferta_nome,Oferta_Dia,Titulo ,Livr_capa,usr_name '+ 
            'from oferta '+
            'INNER JOIN livro on oferta.oferta_livro_id=livro.livro_id '+
            'INNER JOIN appuser on oferta.oferta_user_id=appuser.usr_id');
            let dbofertas = dbResult.rows;
            console.log(dbofertas);
            let ofertas = [];
            for (let dbofer of dbofertas) {
                ofertas.push(dbOfertaTooferta(dbofer));
            }
            return {status:200, result: ofertas || []};
        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "ofertas não encotradas"}};
        }
    
    }



}
module.exports = Ofert;
