const cryptoCurrencySelectElement = document.querySelector('#criptomonedas');
const currencySelectElement = document.querySelector('#moneda');
const formElement = document.querySelector('#formulario');
const resultElement = document.querySelector('#resultado');

const getCryptoCurrencies = async () => {
  const URL = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    showCryptoCurrencies(data.Data);
  } catch (error) {
    console.log(error, 'Error en la consulta');
  };
};

const showCryptoCurrencies = (cryptoCurrencies) => {
  cryptoCurrencies.forEach(cryptoCurrency => {
    const { FullName, Name } = cryptoCurrency.CoinInfo;

    const option = document.createElement('option');
    option.value = Name;
    option.textContent = FullName;
    cryptoCurrencySelectElement.appendChild(option);
  });
};

const startApp = (event) => {
  event.preventDefault();

  const currency = currencySelectElement.value;
  const cryptoCurrency = cryptoCurrencySelectElement.value;

  if ([currency, cryptoCurrency].includes('')) {
    showAlert('Ambos campos son obligatorios');
    return;
  }

  getCryptoCompare(currency, cryptoCurrency);
};

const showAlert = mensaje => {
  const existeAlerta = document.querySelector('.error');

  if (!existeAlerta) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('error');
    divMensaje.textContent = mensaje;

    formElement.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
};

const getCryptoCompare = async (currency, cryptoCurrency) => {
  const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;

  showSpinner();

  try {
    const response = await fetch(URL);
    const data = await response.json();
    showResult(data.DISPLAY[cryptoCurrency][currency]);
  } catch (error) {
    console.log(error, 'Error en la consulta');
  }
};

const showResult = (cryptoCurrency) => {
  cleanHtml();

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cryptoCurrency;

  const price = document.createElement('p');
  price.classList.add('precio');
  price.innerHTML = `El precio es: <span>${PRICE}</span>`;

  const heighPrice = document.createElement('p');
  heighPrice.innerHTML = `Precio más alto del día: <span>${HIGHDAY}</span>`;

  const lowPrice = document.createElement('p');
  lowPrice.innerHTML = `Precio más bajo del día: <span>${LOWDAY}</span>`;

  const lastHours = document.createElement('p');
  lastHours.innerHTML = `Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span>`;

  const lastActualitation = document.createElement('p');
  lastActualitation.innerHTML = `Última actualización: <span>${LASTUPDATE}</span>`;

  resultElement.append(
    price,
    heighPrice,
    lowPrice,
    lastHours,
    lastActualitation);
};

const cleanHtml = () => {
  while (resultElement.firstChild) {
    resultElement.removeChild(resultElement.firstChild);
  }
};

const showSpinner = () => {
  cleanHtml();

  const spinner = document.createElement('div');
  spinner.classList.add('spinner');

  spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  `;

  resultElement.appendChild(spinner);
};

document.addEventListener('DOMContentLoaded', () => {
  getCryptoCurrencies();
  formElement.addEventListener('submit', startApp);
});