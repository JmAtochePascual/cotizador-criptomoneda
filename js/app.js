const criptomonedasSelect = document.querySelector('#criptomonedas');

// Cargar criptomonedas
const consultarCriptomonedas = () => {
  const URL = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  fetch(URL)
    .then(respuesta => respuesta.json())
    .then(resultado => console.log(resultado.Data))
    .catch(error => console.log(error));
};


// Cargar eventos
document.addEventListener('DOMContentLoaded', () => {
  consultarCriptomonedas();
});