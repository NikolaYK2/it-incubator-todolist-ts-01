import React, {useEffect} from "react";
import './App.css';
import ButtonAppBar from "../components/buttonAppBar/ButtonAppBar";
import {TodolistsList} from "../features/todolistsList/TodolistsList";
import {Login} from "../features/login/Login";
import {Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./store";
import CircularProgress from "@mui/material/CircularProgress";
import {initializedAppTC} from "./appReducer";

type AppReduxType = {
    demo?: boolean
}

function AppRedux({demo = false}: AppReduxType) {
    console.log('App')
    const dispatch = useAppDispatch();
    const initialized = useAppSelector<boolean>(state => state.app.initialized)

    useEffect(() => {
        dispatch(initializedAppTC());
    }, [])

    if (!initialized) {
        return <CircularProgress style={{position: 'absolute', left: '50%', top: '40%', color: 'brown'}}/>
    }

    return (
        <div>
            <ButtonAppBar/>
            <Routes>
                <Route path='/' element={<TodolistsList demo={demo}/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default AppRedux;
