import React from 'react';

import classes from './Overlay.module.css';

const Overlay = props => (
  <div className={classes.modal}>
    <div>{props.children}</div>
  </div>
);

export default Overlay;
