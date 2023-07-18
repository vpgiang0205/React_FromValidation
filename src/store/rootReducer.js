import { combineReducers } from "redux";
import svReducer from "./svReducer";
const rootReducer = combineReducers({
    // Child Reducer
    svReducer,
});

export default rootReducer;