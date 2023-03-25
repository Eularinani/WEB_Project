module.exports.genToken = function genToken(length) {
   let token = '';
   let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   for (let i = 0; i < characters.length; i++) {
       token += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return token;
}

