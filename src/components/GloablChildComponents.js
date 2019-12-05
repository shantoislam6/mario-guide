import React from 'react';
import { Modal } from "../providers/ModalProvider";
import { FlashMessage } from './childs/FlashMessage';
import Preloader from './childs/Preloader';
const GloablChildComponents = () => {
  return (
    <React.Fragment>
        <FlashMessage/>
        <Preloader/>
        <Modal/>
    </React.Fragment>
  );
}

export default GloablChildComponents;
