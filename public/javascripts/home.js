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


function populate(books){
    let container = document.getElementById("livros");
    for (let book of books) {
        let containerLivros = document.createElement("div");
        containerLivros.classList.add('livros-card');
        let cardLivros = document.createElement("div");
        containerLivros.appendChild(cardLivros);
        let img = document.createElement("img");
        if (book.capa) {
            img.src = book.capa;
            img.loading = "lazy";
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
        cardLivros.appendChild(containerTitulo);

        container.appendChild(containerLivros);
    }

}