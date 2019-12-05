const intialState = {
  flashMessage: null
};
export default (state = intialState, action) => {
  switch (action.type) {
    case "ENEBLE_FLASH":
      return {
        ...state,
        flashMessage: { ...action.message, duration: action.duration }
      };
    case "DISMISS_FLASH":
      return {
        ...state,
        flashMessage: null
      };
    default:
      return state;
  }
};
