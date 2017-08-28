import {createStore} from 'redux';
import {initialState} from "../../users/redux/user-reducer";
import userReducer from "../../users/redux/user-reducer";

const store = createStore(userReducer);

export default store;
