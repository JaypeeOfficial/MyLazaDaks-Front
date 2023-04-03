import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { userReducer } from "./userReducer";
import { categoryReducer } from "./categoryReducer";

var allReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: categoryReducer,
});

export default allReducers;
