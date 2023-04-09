import React from "react";
import './App.css';
import ButtonAppBar from "../components/buttonAppBar/ButtonAppBar";
import {TodolistsList} from "../features/todolistsList/TodolistsList";

type AppReduxType = {
    demo?: boolean
}
function AppRedux({demo = false}:AppReduxType) {
    console.log('App')

    return (
        <div>
            <ButtonAppBar/>
            <TodolistsList demo={demo}/>
        </div>

    );

}

export default AppRedux;
