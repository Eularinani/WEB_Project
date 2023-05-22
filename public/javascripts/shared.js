/*Como o logout é chamado em todas as páginas, adicionamos a este ficheiro para ser mais fácil*/
async function logout() {
    try {
        let result = await requestLogout();
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        /*Apagamos os dados do user aqui, ao remover do storage do browser
        * */
        localStorage.removeItem("user");
        window.location.pathname = "/index.html"
    } catch (err) {
        console.log(err);
        // alert("Something is not working");
    }
}
