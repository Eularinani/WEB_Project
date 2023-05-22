window.onload = async function () {
    try {
        let result = await getUserAndOffer();
        if (result.err) {  throw result.err; }
        buildResults(result.resultOferta.oferta);
     } catch (err) {
        console.log(err);
       // alert("Something went wrong!")
    }
}

/*Aqui adiciona o nome do utilizador, indo ao storage buscar esta informação e depois cria os cards com os livros na buildBooks*/
function buildResults(offer) {
    var profileName = document.getElementById("profile-name");
    let user = JSON.parse(sessionStorage.getItem("user"));
    profileName.textContent = user.name;
    if (offer && offer.length) buildBooks(offer);
}


/*Cria os cads com os livros para o perfil*/
function buildBooks(books){
    console.log(books);
    let container = document.getElementById("livros");
    for (let book of books) {
        let containerLivros = document.createElement("div");
        // classes bootstrap para ter design responsivo para os cards dos livros
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