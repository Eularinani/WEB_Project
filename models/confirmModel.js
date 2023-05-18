const pool = require("../config/database");

function dbProdToProd (prod) {
    return new Product(prod.prd_id,prod.prd_name,prod.prd_img_url);
}

class Product {
    constructor(id,name,imgUrl) {
        this.id = id;
        this.name = name;
        this.imgUrl = imgUrl;
    }

    static async getProducts() {
        try {
            let dbResult = await pool.query("Select * from product");
            let dbProducts = dbResult.rows;
            let prods = [];
            for (let dbProd of dbProducts) {
                prods.push(dbProdToProd(dbProd));
            }
            return {status:200, result: prods};
        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }
}


module.exports = Product;