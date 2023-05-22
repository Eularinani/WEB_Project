window.onload = async function () {
    try {
        /*Buscar todas as ofertas*/
        let result = await getDataInicio();
        const payload = result && result.oferta || [];
        /*Criar os cards das ofertas com o livro*/
        buildInicio(payload);
        /**/
        getNomeLivrosParaModal();
        submitFormlarioOfertaModal();

        if (result.err) {  throw result.err; }

        console.log("getDataInicio loading");
        //buildResults(result.resultOferta.oferta, user);
    } catch (err) {
        console.log(err);
        // alert("Something went wrong!")
    }
}

async function getDataInicio() {
    try {
        const response = await fetch(`/api/ofertas/inicio`);
        console.log("-------------------------------------------------------");
        console.log("request inicio", response);
        var result = await response.json();
        return { successful: response.status == 200,
            unauthenticated: response.status == 401,
            oferta: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}


function buildInicio(books) {
    console.log(books);
    let container = document.getElementById("inicio-ofertas");

    if (books && books.length) {
    for (let book of books) {
        let containerLivros = document.createElement("div");
        // classes bootstrap para ter design responsivo para os cards dos livros
        containerLivros.classList.add('col-sm-6', 'col-md-4', 'col-xl-3', 'mb-4', 'livros-card');
        let cardLivros = document.createElement("div");
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
        cardLivros.appendChild(containerTitulo);

        // extra for view details
        let verDetalhes = document.createElement("button");
        const idForButton = "ver-detalhes-oferta"+book.id;
        verDetalhes.setAttribute("id", idForButton);
        verDetalhes.classList.add("ver-detalhes-oferta");
        verDetalhes.textContent = "Ver detalhes";
        cardLivros.appendChild(verDetalhes);
        let idOferta = document.createElement("div");
        idOferta.setAttribute("data-id", book.id);
        idOferta.setAttribute("id", "idOferta");
        idOferta.setAttribute("hidden", true);

        verDetalhes.appendChild(idOferta);
        container.appendChild(containerLivros);

        eventosModalDetalhesOferta(idForButton);

    }
    } else
    {
        let noBooks = document.createElement("p");
        container.appendChild(noBooks);
    }

}

function eventosModalDetalhesOferta(idForButton) {
    // modal para o detalhe do livro
    const myModal = new bootstrap.Modal(document.getElementById('modalDetalhes'), {
        keyboard: false
    })

    document.getElementById(idForButton).addEventListener("click", async function () {
        try {
            // ir buscar o id da oferta que estamos a guardar em cada cartao da oferta da página inicio para depois ser enviada para a base de dados, para ir bucar a oferta do livro que clicamos
            const idOferta = this.querySelector("#idOferta").dataset.id;
            /*chamar a route que devolve os dados de uma oferta onde enviamos o seu id*/
            const response = await fetch(`/api/ofertas/detalhe-oferta/${idOferta}`);
            var result = await response.json();
            /*Preenchemos os valores da modal aqui*/
            document.getElementById('tituloLivro').textContent = result.titulo;
            document.getElementById('diaOferta').textContent = new Date(result.dia).toISOString().slice(0, 10);
            document.getElementById('tipoOferta').textContent = result.nome;
            document.getElementById('nomeComprador').textContent = result.nome_utilizador;
            myModal.show();
        } catch (err) {
            // Treat 500 errors here
            console.log(err);
            return {err: err};
        }

    })
}

/*Listener para ouvir quando a modal é aberta e então ir biscar os titulos dos livros
*O evento 'show.bs.modal' é do bootstrap, executa quando clicamos no botão para abrir esta modal */
async function getNomeLivrosParaModal() {
    var myModalEl = document.getElementById('modalRegistrar')
    myModalEl.addEventListener('show.bs.modal', async function (event) {
        console.log("abrir modal");
        try {
            /*Chamada para ir buscar as opções dos livros para a modal, para o select option*/
            const response = await fetch(`/api/livros/titulos`);
            console.log("request titulos", response);
            var books = await response.json();

            if (books && books.length) {
                const selectListaLivros = document.getElementById("opcoesLivros");

                /*Aqui estamos a adicionar todos os livros à modal, que são devolvidos pelo query*/
                for (const book of books) {
                    var option = document.createElement('option');
                    option.text = book.titulo;
                    option.value = book.id;
                    selectListaLivros.add(option, 0);
                }

            }

        } catch (err) {
            // Treat 500 errors here
            console.log(err);
            return {err: err};
        }
    })

}

/*Evento para escutar quando clicamos no botão de submeter uma oferta*/
function submitFormlarioOfertaModal(){
    const form = document.getElementById("form-oferta");
    form.addEventListener("submit", function(e) {
        console.log("formulario");
        e.preventDefault();

        const localizacao = document.getElementById("inputLocalizacao").value;
        const tipoOperacao = document.getElementById("inputOperacao").value;
        const livros = document.getElementById("opcoesLivros").value;
        console.log(localizacao, tipoOperacao, livros)

        // aqui tem de ser chamada a rota com o POST para quardar os dados que já estão acima, que vêm do formulário
    })
}

