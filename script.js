/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */

 const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};
const printLoading = (element) => {
  const getCart = document.querySelector('.cart__title');
  const h2 = document.createElement('h2');
  h2.className = 'loading';
  h2.innerHTML = element;
  getCart.appendChild(h2); 
};

const deleteLoading = () => {
  const getLoading = document.querySelector('.loading');
getLoading.remove('h2');
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
 const cartListaLi = '.cart__items';
 let cookie = [];
 const saveLs = (e) => {
   cookie.push(e);
   localStorage.setItem('cartItems', JSON.stringify(cookie));
 };

 const cartClick = (event) => {
  const takeItem = document.querySelector('.items');
  event.target.remove(takeItem);
if (localStorage.cartClick !== undefined) {
   cookie = JSON.parse(getSavedCartItems());
  localStorage.clear();
  cookie.forEach((element, index) => {
      if (event.innerHTML.slice(2, 27) === element.id) {
        cookie.splice(index, 1);
      }
    }); 
    localStorage.setItem('cartItems', JSON.stringify(cookie));
  }
  cookie.length = 0;
};

// // const calcTotal = () => {
// //   let sum = 0;
//   const storeditems = document.querySelectorAll(cartListaLi);
//   storeditems.forEach((cartListaLi) => {
//     sum += cartListaLi;
//     return sum;
//   });

//   const totalPrice = document.querySelector('.total-price');
//   totalPrice.innerText = `Subtotal: $${sum}`;
//   console.log(sum);
// };

  const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartClick);
  return li;
};

const loadProducts = () => {
  if (!JSON.parse(localStorage.getItem('cartItems'))) { 
   localStorage.setItem('cartItems', JSON.stringify([]));
  }
  const data = JSON.parse(localStorage.getItem('cartItems'));
  const capCartItems = document.querySelector(cartListaLi);
  // verificar se data não é vazia, se nao for , seguir pro forEach    
  data.forEach((item) => { // adicionar todos os items no carrinho
   capCartItems.appendChild(createCartItemElement(item));
  });
 };

const proList = async () => {
  printLoading('carregando...');
  const respProd = await fetchProducts('computador');
  deleteLoading();
  const { results } = respProd;
  const itemsCap = document.querySelector('.items');
  results.forEach((element) => itemsCap.appendChild(createProductItemElement(element)));
};

const prodCart = async (prod) => {
  printLoading('carregando...');
  const value = await fetchItem(prod);
  deleteLoading();
  const capCartItems = document.querySelector(cartListaLi);
  capCartItems.appendChild(createCartItemElement(value));
  saveLs(value);
  console.log(value);
};

const selectItem = () => { 
  const cart = document.querySelector('.items'); 
  cart.addEventListener('click', (event) => {
    prodCart(event.target.parentNode.firstChild.innerHTML);
    });
  };

const btn = document.querySelector('.empty-cart'); 
const list = document.querySelector(cartListaLi);

btn.addEventListener('click', () => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  localStorage.clear();
});
// // const getStorage = () => {
// //   const getItem = JSON.parse(getSavedCartItems());

//   getItem.forEach((element) => {
//     const obj = {
//     id: element[0],
//     title: element[1],
//     price: element[2],
//   };
//     cart.appendChild(createCartItemElement(obj));
//     arr.push(element);
// });
// };

window.onload = () => { 
  loadProducts();
  proList();
   selectItem(); 
};
