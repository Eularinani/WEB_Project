function changePage(url,msg,verbose) {
    window.location.pathname = url;
    if (verbose) alert(msg);
}


// It will go to the login page if not authenticated
// Otherwise it will set the window.user with the user profile
async function checkAuthenticated(verbose) {
    try {
        let result = await requestProfile();
        if (result.unauthenticated)
            changePage("index.html","Not authenticated. Going to login page",verbose);
        else if (!result.successful || result.err) 
            throw err || "Not successful";
        else window.user = result.user;
        return {successful: true};
    } catch (err) {
        console.log(err);
        return {err:err};
    }
}
