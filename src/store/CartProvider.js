import React, { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const addItemToCartHandler = (item, quantity) => {
    if(!item.quantity){
        setItems([...items, {...item, quantity: Number(quantity)}]);
        return;
    }
    const newItems = items.reduce((acc, ele) => {
        if(ele.id === item.id){
            const newQuantity = ele.quantity + Number(quantity);
            acc.push({...item, quantity: newQuantity})
        }
        return acc;
    }, []);
    setItems(newItems);
  };
  const removeItemFromCartHandler = (id) => {
    const newItems = items.reduce((acc, item) => {
        if(item.id === id && item.quantity > 1){
            acc.push({...item, quantity: item.quantity-1})
        }
        else if(item.id !== id) {
            acc.push(item);
        }
        return acc;
    }, []);
    setItems(newItems);
  };

  const cartContext = {
    items: items,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
