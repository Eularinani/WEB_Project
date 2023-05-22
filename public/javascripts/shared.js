/*Como o logout é chamado em todas as páginas, adicionamos a este ficheiro para ser mais fácil*/
async function logout() {
    try {
        let result = await requestLogout();
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        /*Apagamos os dados do user aqui, ao remover do storage do browser
        * */
        sessionStorage.removeItem("user");
        window.location.pathname = "/index.html"
    } catch (err) {
        console.log(err);
        // alert("Something is not working");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const login = document.getElementById("login-option");
    const logout = document.getElementById("logout-option");

    if (user && user.id) {
        login.classList.add("d-none");
        logout.classList.remove("d-none");
    } else {
        login.classList.remove("d-none");
        logout.classList.add("d-none");
    }
});