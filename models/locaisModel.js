const pool = require("../config/database");

function dbLocalTolocal (DBLoc) {
    return new Local(local.local_id,local.Local_raio,local.local_endereco);
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