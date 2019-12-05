import React from "react";
import ReduxProvider from "./ReduxProvider";
import { ModalProvider } from "./ModalProvider";

const Provider = props => {
  return (
    <ReduxProvider>
      <ModalProvider>{props.children}</ModalProvider>
    </ReduxProvider>
  );
};

export default Provider;
