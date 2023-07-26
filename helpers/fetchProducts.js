// const fetch = require('node-fetch');

const fetchProducts = async (parametro) => {
  if (!parametro) {
    throw new Error('You must provide an url');
  }  

  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const obj = await fetch(url);
  const json = await obj.json();
   console.log(json);
  return json;
};

if (typeof module !== 'undefined') {
  (
   module.exports = fetchProducts
 ); 
 }
 fetchProducts('computador');
