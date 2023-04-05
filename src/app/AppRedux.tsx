import React from "react";
import './App.css';
import ButtonAppBar from "../components/buttonAppBar/ButtonAppBar";
import {TodolistsList} from "../features/todolistsList/TodolistsList";


function AppRedux() {
    console.log('App')

    return (
        <div>
            <ButtonAppBar/>
            <TodolistsList/>
        </div>

    );

}

export default AppRedux;
