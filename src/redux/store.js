import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import promise from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = applyMiddleware(promise);

const store = createStore(reducers, composeWithDevTools(middleware));

export default store;
