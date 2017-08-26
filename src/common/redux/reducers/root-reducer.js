import userReducer from '../../../users/redux/user-reducer';
import {combineReducers} from "redux";

const rootReducer = combineReducers(userReducer());

export default rootReducer;