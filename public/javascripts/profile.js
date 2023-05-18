window.onload = async function () {
    try {
        let result = await getUserAndOffer();
        if (result.err) {  throw result.err; }
        window.user = user;
        buildResults(result.resultOferta.oferta, user);
        //document.getElementById('user').textContent =window.user.name;
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

        window.location.pathname = "/Home.html"
    } catch (err) {
        console.log(err);
       // alert("Something is not working");
    }
}


async function mensagem() {
    try {
        window.location.pathname = "/inicio.html"
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

function buildResults(offer, user) {
    var profileName = document.getElementById("profile-name");
    profileName.textContent = user.name;
    if (offer && offer.length) buildBooks(offer);
}



function buildBooks(books){
    console.log(books);
    let container = document.getElementById("livros");
    for (let book of books) {
        let containerLivros = document.createElement("div");
        containerLivros.classList.add('col-sm-6', 'col-md-4', 'col-xl-3', 'mb-4', 'livros-card');
        let cardLivros = document.createElement("div");
        let date = document.createElement("span");
        containerLivros.appendChild(cardLivros);
        let img = document.createElement("img");
        if (book.imagem_livro) {
            img.src = book.imagem_livro;
            img.loading = "lazy"; // carrega só as imagens quando ficam visiveis no ecrã
            img.alt = `Capa do livro ${book.titulo}`;
        } else {
            img.src = "/images/logo.png";
            img.loading = "lazy";
            img.alt = `Capa do livro ${book.titulo}`;
        }
        cardLivros.appendChild(img);

        // For the section
        let containerTitulo = document.createElement("div");
        let nomeLivro = document.createElement("span");
        containerTitulo.appendChild(nomeLivro);

        nomeLivro.textContent = book.titulo;
        date.textContent = new Date(book.dia).toISOString().slice(0, 10);
        date.classList.add('text-center');
        cardLivros.appendChild(containerTitulo);
        cardLivros.appendChild(date);

        container.appendChild(containerLivros);
    }

}