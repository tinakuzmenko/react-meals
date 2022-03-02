import React, { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';

import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalPrice = `€${cartCtx.totalPrice.toFixed(2)}`;
  const isNotEmpty = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async userData => {
    setIsSubmitting(true);
    await fetch(
      'https://react-meals-delivery-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          items: cartCtx.items,
        }),
      },
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
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

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onHideCart} className={classes['button--alt']}>
        Close
      </button>
      {isNotEmpty && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const submittingModalContent = <p>Sending order data...</p>;

  const cartModalContent = (
    <>
      {isNotEmpty ? (
        <ul className={classes['cart-items']}>{cartItems}</ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className={classes.total}>
        <span>Total Price</span>
        <span>{totalPrice}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const submittedModalContent = (
    <>
      <p>
        Your order has been received. You'll get your order in approximately 30
        minutes!
      </p>
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes.button}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && submittingModalContent}
      {!isSubmitting && didSubmit && submittedModalContent}
    </Modal>
  );
};

export default Cart;
