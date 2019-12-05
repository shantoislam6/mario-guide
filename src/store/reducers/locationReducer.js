const initialState = {
  prevLocation: {},
  currentLocation: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "ACTION_POP":
      return {
        ...state,
        prevLocation: { ...state.currentLocation },
        currentLocation: { ...action.location }
      };
    case "ACTION_PUSH":
      return {
        ...state,
        prevLocation: { ...state.currentLocation },
        currentLocation: { ...action.location }
      };
    default:
      return state;
  }
};
