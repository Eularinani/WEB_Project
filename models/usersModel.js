const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");
const saltRounds = 10; 

function dbUserToUser(dbUser)  {
    let user = new User();
    user.id = dbUser.usr_id;
    user.name = dbUser.usr_name;
    user.foto = dbUser.usr_foto;
    user.email = dbUser.usr_email ;
    return user;
}


class User {
    constructor(id, name, email, foto,pass, token) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.foto = foto;
        this.pass = pass;
        this.token = token;
    }
    export() {
        let user=new User();
        user.name = this.name;
        user.email = this.email;
        user.foto = this.foto
        return user; 
    }


//fornecer informçoes ao perfil
static async getperfil(id) {
    try {
        let dbResult = await pool.query('select  usr_name,usr_foto,Oferta_nome, Oferta_foto,Oferta_Dia,Titulo, Livr_capa,Livro_Volume FROM appuser'+
        'INNER JOIN oferta on appuser.usr_id =oferta.oferta_user_id INNER JOIN livro on oferta.oferta_livro_id=livro.livro_id where usr_id=$2' , [id]);
        let dbUsers = dbResult.rows;
        if (!dbUsers.length) 
            return { status: 404, result:{msg: "No user found for that id."} } ;
        let dbUser = dbUsers[0];
        let user = 
        user.books = dbUser.book
        return { status: 200, result: 
            new User(dbUser.id,dbUser.usr_name,dbUser.usr_foto)} ;
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }  
}

//atualizar foto de perfil
static async savefoto(id) {
    try {
        let dbResult = await pool.query(`Update appuser set usr_foto=$1 where usr_id = $2`,
        [user.foto,id]);
        let dbUsers = dbResult.rows;
        if (!dbUsers.length) 
            return { status: 404, result:{msg: "No user found for that id."} } ;
        let user = dbUserToUser (dbUsers[0]);
        return { status: 200, result:  user} ;
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }  
}

//fornecer informçoes ao perfil
    static async getById(id) {
        try {
            let dbResult = await pool.query("Select * from appuser where usr_id=$1", [id]);
            let dbUsers = dbResult.rows;
            if (!dbUsers.length)
                return { status: 404, result:{msg: "No user found for that id."} } ;
            let dbUser = dbUsers[0];
            return { status: 200, result: 
                new User(dbUser.usr_id,dbUser.usr_name,dbUser.usr_pass, dbUser.usr_token)} ;
        } catch (err) {
            console.log(err);
             return { status: 500, result: err };
        }  
    }


static async register(user) {
    try {
        let dbResult =
            await pool.query("Select * from appuser where usr_email=$1", [user.email]);
        let dbUsers = dbResult.rows;
        if (dbUsers.length)
            return {
                status: 400, result: [{
                    location: "body", param: "email",
                    msg: "That name already exists"
                }]
            };
        let encpass = await bcrypt.hash(user.pass,saltRounds);   
        dbResult = await pool.query(`Insert into appuser (usr_name,usr_email, usr_pass)
                   values ($1,$2,$3)`, [user.name,user.email, encpass]);
        return { status: 200, result: {msg:"Registered! You can now log in."}} ;
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}
    static async checkLogin(user) {
        try {
            let dbResult =
                await pool.query("Select * from appuser where usr_email=$1", [user.email]);
            let dbUsers = dbResult.rows;
            if (!dbUsers.length)
                return { status: 401, result: { msg: "Wrong username or password!"}};
            let dbUser = dbUsers[0]; 
            let isPass = await bcrypt.compare(user.pass,dbUser.usr_pass);
            if (!isPass) 
                return { status: 401, result: { msg: "Wrong username or password!"}};
           
            return { status: 200, result: dbUserToUser(dbUser) } ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    // No verifications. Only to use internally
    static async saveToken(user) {
        try { 
            let dbResult =
                await pool.query(`Update appuser set usr_token=$1 where usr_id = $2`,
                [user.token,user.id]);
            return { status: 200, result: {msg:"Token saved!"}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async getUserByToken(token) {
        try {
            let dbResult =
                await pool.query(`Select * from appuser where usr_token = $1`,[token]);
            let dbUsers = dbResult.rows;
            if (!dbUsers.length)
                return { status: 403, result: {msg:"Invalid authentication!"}} ;
            let user = dbUserToUser(dbUsers[0]);
            return { status: 200, result: user} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}

module.exports = User;