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


    static async getUserShoplist(userId,shoplistId) {
        try {
            let dbResult = await pool.query(
                "Select * from shoplist where shl_usr_id = $1 and shl_id = $2", 
                [userId,shoplistId]);
            if (dbResult.rows.length == 0) {
                return {status:404, result: {msg:"That shoplist does not exist on your collection."}};
            }
            let shoplist = dbShopListToShopList(dbResult.rows[0]);
            shoplist.items = [];
            // Falta a parte de contar quantos produtos temos comprados
            let dbItems = await pool.query(
                `Select item.*, product.*, unit.*, COALESCE(SUM(b_quant),0)  as bought from item 
                inner join product on it_prd_id = prd_id
                inner join unit on it_un_id = un_id
                left join bought on b_it_id = it_id
                where it_shl_id = $1
                group by it_id, prd_id, un_id`,  [shoplistId]);
                
            for(let dbit of dbItems.rows) {
                shoplist.items.push(dbItemToItem(dbit));
            }

            return {status:200, result: shoplist};

        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }
    

    static async getEncomendaOFERTA(ofertaID) {
        try {
            let dbItems = await pool.query(
                `select  Oferta_nome,Oferta_Dia,Titulo,Livr_capa,usr_name,Transacao_nome
                FROM oferta
                INNER JOIN livro on oferta.oferta_livro_id=livro.livro_id
                INNER JOIN appuser on oferta.oferta_user_id=appuser.usr_id
                INNER JOIN transacao on oferta.oferta_id=transacao.Transacao_Oferta_id
                WHERE oferta_id = $1`,  [ofertaID]);
            let dbItem = dbItems.rows;
            if(!dbItem.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "id",
                        msg: "Essa oferta já foi feita"
                    }]
                }; 
            let ofertas;
            ofertas.nome = dbItem.oferta_nome;
            ofertas.dia = dbItem.oferta_dia;
            ofertas.titulo = dbItem.titulo;
            ofertas.capa = dbItem.livr_capa;
            ofertas.nome_utilizador = dbItem.usr_name;
            ofertas.nome_transacao = dbItem.transacao.nome;
            return {status:200, result: ofertas};

        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
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
