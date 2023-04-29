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
        let li = document.createElement("li");
        let img = document.createElement("img");
        if (book.capa) {
            img.src = book.capa;
        } else {
            img.src = "/images/logo.png";
        }   
        li.appendChild(img);
        let sec = document.createElement("section");
        li.appendChild(sec);
        // For the section
        let name = document.createElement("h3");
        name.textContent = book.titulo;
        sec.appendChild(name);
        container.appendChild(li);
    }let img = document.createElement("img");
}