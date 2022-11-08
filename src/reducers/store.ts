import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoListsReducer} from "./todoListsReducer";



const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    })

export type AppRootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);



// @ts-ignore
window.store = store;