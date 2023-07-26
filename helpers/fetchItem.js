const fetchItem = async (id) => {
    const url = `https://api.mercadolibre.com/items/${id}`;
  const obj = await fetch(url);
  const json = await obj.json();
    return json;
};
if (typeof module !== 'undefined') {
 (
  module.exports = fetchItem
); 
}
