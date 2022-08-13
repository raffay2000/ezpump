import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk  from "redux-thunk";
import App_Reducer from "../Reducer/App_Reducer";
import LoginReducer from "../Reducer/LoginReducer";
import SignUpReducer_Company from "../Reducer/SignUpReducer_Company";
import SignUpReducer_Pump from "../Reducer/SignUpReducer_Pump";


const rootReducer = combineReducers({
    App_Reducer:App_Reducer,
    // LoginReducer:LoginReducer,
    // SignUpReducer_Company:SignUpReducer_Company,
    // SignUpReducer_Pump:SignUpReducer_Pump
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;