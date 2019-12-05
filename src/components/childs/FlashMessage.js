import React from "react";
import { useSelector } from "react-redux";
import { dispatch } from '../../providers/ReduxProvider'
import Alert from './alert';

export const FlashMessage = () => {
  const message = useSelector(state => {
    return state.flashState.flashMessage;
  });

  return message !== null ? (
    <Alert type={message.type} duration={message.duration} >{message.message}</Alert>
  ) : (
    <div></div>
  );
};

export const flash = (message, duration = 2000)=>{
  dispatch({
    type:'ENEBLE_FLASH',
    message: message,
    duration: duration
  })
}
