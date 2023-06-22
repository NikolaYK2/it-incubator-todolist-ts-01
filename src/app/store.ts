import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import {complexACType, tasksReducer} from "features/todolistsList/tasksReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "features/login/authReducer";
import {appReducer} from "./appReducer";
import {todoListsReducer} from "features/todolistsList/todoListsReducer";

//REDUX ----------------------------------------------------------------------
// //помогает следить за нашим редаксковским стором
// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }
//
//
// const rootReducer = combineReducers({
//     todoLists: todoListsReducer,
//     tasks: tasksReducer,
//     app: appReducer,
//     auth: authReducer,
// })
//
//
// //функция нашего плагина для слежки за стором
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//
// export type AppRootState = ReturnType<typeof rootReducer>;
// export const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware), composeEnhancers()));
//
// //TYPE ACTIONS APP ==========
// export type ActionsType =
//     | complexTypeActions
//     | complexACType
//     | ActionsAppType
//     | ComplexLoginACType;
// //TYPE THUNK---
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType, //-void типо
//     AppRootState, //type всего нашего app
//     unknown,
//     ActionsType // типы наших редьюсеров
// >
//
//
// // Create a type for thunk dispatch ===========================
// export type AppThunkDispatch = ThunkDispatch<AppRootState, unknown, ActionsType>;
// export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
// export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;//здесь мы его не вызываем
//
//
// // @ts-ignore
// window.store = store;


//RTK -----------------------------------------------------------------------------
export const store = configureStore({
    reducer: {
        todoLists: todoListsReducer,
        tasks: tasksReducer,
        app: appReducer,
        auth: authReducer,
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

