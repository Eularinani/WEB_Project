const pool = require("../config/database");

function dbLocalTolocal (DBLoc) {
    let local = new Local();
    local.id = DBLoc.local_id;
    local.distrito = DBLoc.local_endereco;
    local.zona = DBLoc.local_raio;
    return local;
}

class Local{
    constructor(id,distrito,zona){
        this.id=id;
        this.distrito=distrito;
        this.zona=zona;
    }

    static async getLocais() {
        try {
            let dbResult = await pool.query("Select * from Locais");
            let dbLoc = dbResult.rows;
            let locs = [];
            for (let dblocal of dbLoc) {
                locs.push(dbLocalTolocal(dblocal));
            }
            return {status:200, result: locs};
        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    } 

}
module.exports = Local;