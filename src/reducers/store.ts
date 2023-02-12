import {combineReducers, compose, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoListsReducer} from "./todoListsReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

//помогает следить за нашим редаксковским стором
declare global {
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    })

//функция нашего плагина для слежки за стором
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppRootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, composeEnhancers());
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector



// @ts-ignore
window.store = store;