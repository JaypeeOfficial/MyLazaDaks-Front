import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import allReducers from  "../reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(allReducers, composeWithDevTools());

export default store; 
 
