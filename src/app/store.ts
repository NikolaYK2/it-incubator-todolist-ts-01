import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../features/todolistsList/tasksReducer";
import {todoListsReducer} from "../features/todolistsList/todoListsReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {appReducer} from "./appReducer";

//помогает следить за нашим редаксковским стором
declare global {
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer
    })

//функция нашего плагина для слежки за стором
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppRootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware ), composeEnhancers()));
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;//здесь мы его не вызываем

// 2. Create a type for thunk dispatch ===========================
export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>;
// export const useAppDispatch =()=> useDispatch<AppThunkDispatch>();

// @ts-ignore
window.store = store;