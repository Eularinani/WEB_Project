window.onload = async function () {
    try {
        let result = await checkAuthenticated(true);
        if (result.err) {  throw result.err; }
        window.user = user;
        //document.getElementById('user').textContent =window.user.name;
     } catch (err) {
        console.log(err);
       // alert("Something went wrong!")
    }
}
window.onload = async function () {
    try{
        
        //esse codigo traz as coisa atraves da funçao crida 
        let res = await getAllbooks();
        console.log(res);
        if (!res.successful) throw {msg:"Something went wrong"};
        populate(res.books.result);
    } catch(err) {
        console.log(err);
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



async function addItem() {
    let slId = sessionStorage.getItem("shoplistId");
    let prodId = parseInt(document.getElementById("prodId").value);
    let quant = parseFloat(document.getElementById("quant").value);
    let res = await requestAddItem(slId,prodId,quant,2);
    if (res.successful) {
        let container = document.getElementById("items");
        // Incorrect, should not user innerHTML (TODO)
        container.innerHTML = "";      
        res = await requestUserShoplist(slId);
        populateItems(res.shoplist.items);
        alert("Inserted!");
    } else {
        alert("Error!");
    }
} 