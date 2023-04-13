async function requestRegister(nome,dia,contra_p,user,livro) {
    try {
        const response = await fetch(`/api/oferta/`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
              ofertaname: nome,
              ofertadia: dia,
              ofertacontra_p: contra_p,
              ofertauser: user,
              ofertalivro: livro
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