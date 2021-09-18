import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import pokemonsReduser from "./pokemonsReduser";
import {authReduser} from "./authReduser";
import {profileReduser} from "./profileReduser";


let reducers = combineReducers({
    pokemonsPage: pokemonsReduser,
    auth:authReduser,
    profilePage:profileReduser

});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;
