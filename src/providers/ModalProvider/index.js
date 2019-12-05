import React from 'react';
import { ModalProviderExporter, Context } from './ModalProvider';
import ModelContainer from './Modal';

export const useModal = ()=>{
  const context = React.useContext(Context);
  const setModalCallBack = function(callback, question){
    context.show(()=>{
      return callback;
    }, question);
  }
  return setModalCallBack;
}

export const withModal = (Child)=>{
  return (props)=>{
    const Model = useModal();
    return <Child {...props} modal={Model} />
  }
}

export const modalContext = Context;
export const ModalProvider = ModalProviderExporter;
export const Modal = ModelContainer;
