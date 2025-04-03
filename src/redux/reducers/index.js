import { combineReducers } from "redux";
import notifyReducer from "./notifyReducer";
import authReducer from "./authReducer";
const rootReducer = combineReducers({

  notify: notifyReducer,
  auth: authReducer,
  // loading: loadingReducer,
  // Add other reducers here
});

export default rootReducer;
