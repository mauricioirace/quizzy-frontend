import {createStore} from 'redux'
import userReducer from "../../users/redux/user-reducer";

export default createStore(userReducer);