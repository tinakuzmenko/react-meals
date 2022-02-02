import { useContext } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const CartCtx = useContext(CartContext);
  const cartItemsAmount = CartCtx.items.reduce(
    (total, item) => total + item.amount,
    0,
  );

  return (
    <button onClick={props.onClick} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemsAmount}</span>
    </button>
  );
};

export default HeaderCartButton;
