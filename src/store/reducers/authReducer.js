const initialState = {
  loginLogOutHanlded: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loginLogOutHanlded: true,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loginLogOutHanlded: true,
        user: {},
        authMessage: action.message,
      };
    case "LOGGED_OUT":
      return {
        ...state,
        loginLogOutHanlded: true,
      };
    default:
      return state;
  }
};

export default authReducer;
