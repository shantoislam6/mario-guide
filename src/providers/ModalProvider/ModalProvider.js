import React, { createContext, useState } from "react";

export const Context = createContext();

export const ModalProviderExporter = props => {
  const [isShow, setShow] = useState(false);
  const [question, setQuestion] = useState("");
  const [executable, setExecutable] = useState(null);

  function showConfirmModal(passQuestion, passExeCuteable) {
    setQuestion(passQuestion);
    setShow(true);
    setExecutable(passExeCuteable);
  }

  function dissmissHandler() {
    setQuestion("");
    setShow(false);
    setExecutable(null);
  }

  return (
    <Context.Provider
      value={{
        show: showConfirmModal,
        executable: executable,
        modalShow: isShow,
        dismissed: dissmissHandler,
        question: question
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
