const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");
const saltRounds = 10; 

function dbLivroToLivro(dbLivro)  {
    let livro = new Livro();
    livro.id = dbLivro.livro_id;
    livro.titulo = dbLivro.titulo;
    livro.capa = dbLivro.livr_capa;
    livro.lancamento = dbLivro.livro_lançamento;
    livro.volume = dbLivro.livro_volume;
    return livro;
}
class Livro{
    constructor(id,titulo,capa,lancamento,volume,){
        this.id=id
        this.titulo=titulo
        this.capa=capa
        this.lancamento=lancamento
        this.volume=volume
    }

    static async books(Livro){
        
        let dbResult =
        await pool.query("select * from livro where (livro_lançamento =$1)and(livro_volume =$2)", [livro.lancamento,livro.volume]);
    let dbLivro = dbResult.rows;
    if (dbLivro.length)
        return {
            status: 400, result: [{
                location: "body", param: "livro",
                msg: "That name already exists"
            }]
        };  
    dbResult = await pool.query(`insert into livro(livro_id, titulo, livro_lançamento, livro_volume)
    values ($1,$2,$3,#4)`, [livro.id, livro.titulo,livro.capa,livro.lancamento,livro.volume]);
    return { status: 200, result: {msg:""}} ;
} catch (err) {
    console.log(err);
    return { status: 500, result: err };
}

static async getbooks() {
    try {
        let dbResult = await pool.query("select titulo, Livr_capa from livro");
        let dbbooks = dbResult.rows;
        let book = [];
        for (let dbbook of dbbooks) {
            book.push(dbLivroToLivro(dbbook));
        }
        return {status:200, result: book};
    } catch (err) {
        console.log(err);
        return {status: 500, result: {msg: "Something went wrong."}};
    }
}





}
module.exports = Livro;