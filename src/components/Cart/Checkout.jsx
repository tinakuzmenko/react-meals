import React, { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isValidPostcode = value => value.trim().length === 6;

const Checkout = props => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postcode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postcodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = event => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostcode = postcodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostcodeIsValid = isValidPostcode(enteredPostcode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostcodeIsValid &&
      enteredCityIsValid;

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postcode: enteredPostcodeIsValid,
      city: enteredCityIsValid,
    });

    if (!formIsValid) return;

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postcode: enteredPostcode,
      city: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !formInputsValidity.name ? classes.invalid : ''
        }`}
      >
        <label htmlFor="name">Your name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          name="name"
          placeholder="James Bond"
        />
        {!formInputsValidity.name && <p>Please, enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.street ? classes.invalid : ''
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          ref={streetInputRef}
          type="text"
          id="street"
          name="street"
          placeholder="Pr. Beatrixlaan"
        />
        {!formInputsValidity.street && <p>Please, enter a valid street!</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.postcode ? classes.invalid : ''
        }`}
      >
        <label htmlFor="postcode">Postal code</label>
        <input
          ref={postcodeInputRef}
          type="text"
          id="postcode"
          name="postcode"
          placeholder="2181SH"
        />
        {!formInputsValidity.postcode && (
          <p>Please, enter a valid postal code (6 characters long)!</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.city ? classes.invalid : ''
        }`}
      >
        <label htmlFor="city">City</label>
        <input
          ref={cityInputRef}
          type="text"
          id="city"
          name="city"
          placeholder="Hillegom"
        />
        {!formInputsValidity.city && <p>Please, enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button onClick={props.onCancel} type="button">
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
