const User = require("../models/usersModel");
// The correct value depends maxAge of the cookie (see index.js)
const refreshPer =  1440e3; // 1440e3 milliseconds = 1 hour

module.exports.verifyAuth = async function (req, res, next) {
    try {
        let token = req.session.token;
        if (!token) {

            return res.status(401).send({ msg: "Please log in." });
        }
        let result = await User.getUserByToken(token);
        if (result.status != 200) {

            return res.status(result.status).send(result.result);
        }
         req.user = result.result;
        // Each time it changes the cookie expiration will be refreshed
        // Smaller number in "refreshPer" means we refresh more times 
        req.session.timestamp =  Math.floor(Date.now() / refreshPer)
        // passing  to next rule
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
} 