const criptomonedasSelect = document.querySelector('#criptomonedas');

// Cargar criptomonedas
const consultarCriptomonedas = () => {
  const URL = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  fetch(URL)
    .then(respuesta => respuesta.json())
    .then(resultado => cargarSelectCriptomonedasElement(resultado.Data))
    .catch(error => console.log(error));
};


// Cargar criptomonedas en el select
const cargarSelectCriptomonedasElement = criptomonedas => {
  criptomonedas.forEach(cripto => {
    const { FullName, Name } = cripto.CoinInfo;

    const option = document.createElement('option');
    option.value = Name;
    option.textContent = FullName;
    criptomonedasSelect.appendChild(option);
  });
};


// Cargar eventos
document.addEventListener('DOMContentLoaded', () => {
  consultarCriptomonedas();
});