const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");
const saltRounds = 10; 

function dbLivroToLivro(dbLivro)  {
    let livro = new Livro();
    livro.id = dbLivro.Livro_id;
    livro.titulo = dbLivro.titulo;
    livro.lancamento = dbLivro.Livro_lançamento;
    livro.volume = dbLivro.Livro_volume;
    return livro;
}
class Livro{
    constructor(id,titulo,lancamento,volume,oferta_id,contra_p){
        this.id=id
        this.titulo=titulo
        this.lancamento=lancamento
        this.volume=volume
        this.oferta_id=oferta_id
        this.contra_p=contra_p
    }

    static async addbook(Livro){
        
        let dbResult =
        await pool.query("select *from livro where (livro_lançamento =$1)and(livro_volume =$2)", [livro.lancamento,livro.volume]);
    let dbLivro = dbResult.rows;
    if (dbLivro.length)
        return {
            status: 400, result: [{
                location: "body", param: "email",
                msg: "That name already exists"
            }]
        };  
    dbResult = await pool.query(`insert into livro(livro_id, titulo, livro_lançamento, livro_volume)
    values ($1,$2,$3,#4)`, [livro.id, livro.titulo,livro.lancamento,livro.volume]);
    return { status: 200, result: {msg:""}} ;
} catch (err) {
    console.log(err);
    return { status: 500, result: err };
}

}
module.exports = Livro;