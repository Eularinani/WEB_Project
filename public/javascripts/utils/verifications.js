function changePage(url,msg,verbose) {
    window.location.pathname = url;
    if (verbose) alert(msg);
}


// It will go to the login page if not authenticated
// Otherwise it will set the window.user with the user profile
async function getUserAndOffer() {
    try {
        let result = await requestProfile();
        let resultOferta;
        if (result && result.user) {
            resultOferta = await requestOferta(2);
        }
        else {
            return {successful: false};
        }
        if (result.unauthenticated)
            changePage("index.html","Not authenticated. Going to login page");
        else if (!result.successful || result.err) 
            throw err || "Not successful";
        else window.user = result.user;
        return {successful: true, resultOferta};
    } catch (err) {
        console.log(err);
        return {err:err};
    }
}
