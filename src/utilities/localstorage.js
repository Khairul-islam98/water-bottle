const getStoreCart = () => {
    const storeCartString = localStorage.getItem('cart');
    if(storeCartString){
        return JSON.parse(storeCartString)
    }
    return [];
}

const saveCartToLs = cart => {
    const cartStringified = JSON.stringify(cart)
    localStorage.setItem('cart', cartStringified)
}

const addToLS = id => {
    const cart = getStoreCart();
    cart.push(id)
    // save to local storage
    saveCartToLs(cart)
}

const removeFromLS = id => {
    const cart = getStoreCart()
    // remove every id
    const remaining = cart.filter(idx => idx !== id);
    saveCartToLs(remaining)
}
 
export { addToLS, getStoreCart, removeFromLS }