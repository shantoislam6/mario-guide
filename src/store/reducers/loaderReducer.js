const initialState = {
  isSipinning: false,
  isPreloading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ENABLE_BTN_SPINNER":
      return {
        ...state,
        isSipinning: true
      };
    case "DISABLE_BTN_SPINNER":
      return {
        ...state,
        isSipinning: false
      };
    case "ENABLE_SCREEN_PRELOADER":
      return {
        ...state,
        isPreloading: true
      };
    case "DISABLE_SCREEN_PRELOADER":
      return {
        ...state,
        isPreloading: false
      };
    default:
      return state;
  }
};
