import { createBrowserHistory } from "history";
import { dispatch } from "./providers/ReduxProvider";
export const history = createBrowserHistory();
// POP dispatch
dispatch({
  type: "ACTION_POP",
  location: { ...history.location, action: history.action }
});

//push dispatch
history.listen((location, action) => {
  dispatch({
    type: "ACTION_PUSH",
    location: { ...location, action: action }
  });
});
