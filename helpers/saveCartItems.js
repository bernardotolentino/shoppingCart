const saveCartItems = (cartList) => {
  if (!cartList) throw new Error('cartList Vazio!');
  localStorage.setItem('cartItems', cartList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems; 
}