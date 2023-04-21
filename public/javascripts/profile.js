window.onload = async function () {
    try {
        let result = await checkAuthenticated(true);
        if (result.err) {  throw result.err; }
        window.user = user;
        document.getElementById('user').textContent =window.user.name;
     } catch (err) {
        console.log(err);
       // alert("Something went wrong!")
    }
}

async function logout() {
    try {
        let result = await requestLogout();
        if (!result.successful || result.err)
            throw result.err || { err: "Not successfull" }
        window.location.pathname = "/index.html"
    } catch (err) {
        console.log(err);
       // alert("Something is not working");
    }
}

async function inicio() {
    try {

        window.location.pathname = "/inicio.html"
    } catch (err) {
        console.log(err);
       // alert("Something is not working");
    }
}


async function mensagem() {
    try {
        window.location.pathname = "/Home.html"
    } catch (err) {
        console.log(err);
       // alert("Something is not working");
    }
}

async function perfil() {
    try {
        window.location.pathname = "/profile.html"
    } catch (err) {
        console.log(err);
       // alert("Something is not working");
    }
}