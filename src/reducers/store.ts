import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoListsReducer} from "./todoListsReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";



const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    })

export type AppRootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector



// @ts-ignore
window.store = store;