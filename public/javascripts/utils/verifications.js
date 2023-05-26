function changePage(url,msg,verbose) {
    window.location.pathname = url;
    if (verbose) alert(msg);
}


// It will go to the login page if not authenticated
// Otherwise it will set the window.user with the user profile
async function getUserAndOffer() {
    try {
        let user = JSON.parse(sessionStorage.getItem("user"));
        let resultOferta;

        if (user) {
            resultOferta = await requestOferta(user.id);
        }
        else {
            changePage("index.html","Not authenticated. Going to login page");
        }
        return {successful: true, resultOferta};
    } catch (err) {
        console.log(err);
        return {err:err};
    }
}
