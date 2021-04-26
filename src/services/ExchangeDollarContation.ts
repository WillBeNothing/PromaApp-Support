import axios from 'axios';

export default async function ConvertDolarToReal(priceInDollar: string) {
  const response = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL');

  const BRLCotation = Number(response.data.USDBRL.high);

  const price = Number(priceInDollar) * BRLCotation;

  const formatted = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  return formatted;
}
