async function requestRegister(id,titulo,lancamento,volume) {
    try {
        const response = await fetch(`/api/livros/`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
              livroid:id,
              livrotitulo:titulo,
              livrolancamento:lancamento,
              livrovolume:volume
          })
        });
        // We are not checking for errors (considering the GUI is only allowing correct choices)
        // We only need to send if the user registered or not 
        return { successful: response.status == 200};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}