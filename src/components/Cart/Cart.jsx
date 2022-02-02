import React, { useContext } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';

import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
  const cartCtx = useContext(CartContext);

  const totalPrice = `€${cartCtx.totalPrice.toFixed(2)}`;
  const isNotEmpty = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = cartCtx.items.map(item => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));

  return (
    <Modal onClose={props.onHideCart}>
      {isNotEmpty ? (
        <ul className={classes['cart-items']}>{cartItems}</ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className={classes.total}>
        <span>Total Price</span>
        <span>{totalPrice}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes['button--alt']}>
          Close
        </button>
        {isNotEmpty && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
