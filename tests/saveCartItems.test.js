const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');


test('Testa se ao chamar a funcao com uma lista, o localStorage funciona.', () => {
  saveCartItems('argumento')
  expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'argumento');
});

test('Verifica se é uma função', () => {
  expect(typeof (saveCartItems)).toBe('function');
});
