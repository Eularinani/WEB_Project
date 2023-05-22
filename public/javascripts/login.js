async function login() {
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    try {
        let email = document.getElementById("email").value;
        let pass = document.getElementById("password").value;
        let result = await requestLogin(email,pass);
        if (result.err) {
            msgDOM.textContent = "An error occurred";
        } else if (!result.successful) {
            msgDOM.textContent = "Wrong username or password";    
        } else {
            let result = await requestProfile();
            console.log("login", result);
            /*Aqui guardamos em storage os dados do user quando este faz login com sucesso, apagamos depois quando faz logout
            * Assim nºao é preciso fazer queries de novo em todos os pedidos */
            localStorage.setItem("user", JSON.stringify(result.user));
            msgDOM.textContent = "Login successful!";    
            window.location.pathname = "/inicio.html"
        }
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";
    }
}