import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';
import Overlay from './Overlay';

const portalElement = document.getElementById('overlays');

const Modal = props => (
  <>
    {ReactDOM.createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
    {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalElement)}
  </>
);

export default Modal;
