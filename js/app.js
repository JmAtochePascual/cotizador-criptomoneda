// Selectores
const criptomonedasSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

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


// Inicia la consulta
const consultarCriptomoneda = e => {
  e.preventDefault();

  const moneda = document.querySelector('#moneda').value;
  const criptoMoneda = document.querySelector('#criptomonedas').value;

  if ([moneda, criptoMoneda].includes('')) {
    mostrarAlerta('Ambos campos son obligatorios');
    return;
  }

  consultarAPI(moneda, criptoMoneda);
};


// Muestra un mensaje de alerta 
const mostrarAlerta = mensaje => {
  const existeAlerta = document.querySelector('.error');

  if (!existeAlerta) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('error');
    divMensaje.textContent = mensaje;

    formulario.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
};


// Consultar API
const consultarAPI = (moneda, criptoMoneda) => {
  const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

  fetch(URL)
    .then(respuesta => respuesta.json())
    .then(resultado => mostrarResultado(resultado.DISPLAY[criptoMoneda][moneda]))
    .catch(error => console.log(error));
};


// Mostrar resultado
const mostrarResultado = (criptomoneda) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = criptomoneda;

  const precio = document.createElement('p');
  precio.classList.add('precio');
  precio.innerHTML = `El precio es: <span>${PRICE}</span>`;

  const precioAlto = document.createElement('p');
  precioAlto.innerHTML = `Precio más alto del día: <span>${HIGHDAY}</span>`;

  const precioBajo = document.createElement('p');
  precioBajo.innerHTML = `Precio más bajo del día: <span>${LOWDAY}</span>`;

  const ultimasHoras = document.createElement('p');
  ultimasHoras.innerHTML = `Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span>`;

  const ultimaActualizacion = document.createElement('p');
  ultimaActualizacion.innerHTML = `Última actualización: <span>${LASTUPDATE}</span>`;

  resultado.append(
    precio,
    precioAlto,
    precioBajo,
    ultimasHoras,
    ultimaActualizacion);
};


// Cargar eventos
document.addEventListener('DOMContentLoaded', () => {
  consultarCriptomonedas();
  formulario.addEventListener('submit', consultarCriptomoneda);
});