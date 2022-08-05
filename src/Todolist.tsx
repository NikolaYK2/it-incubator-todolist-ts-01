import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./components/Button";
import {filterValueType} from "./App";
import {FullInput} from "./components/FullInput";
import {UniversalInput} from "./components/UniversalInput";

type TasksPropsType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type TodolistPropsType = {
    title: string,
    tasks: TasksPropsType[]
    deleteTask: (idId: string) => void,
    addTask: (addTitle: string) => void
    callBackButtonAdd: () => void
    // changeTasksFilter: (filterValue: filterValueType) => void,//если параметр не передаем то пустая функция
    setFilterValue:(filterValue: filterValueType)=>void
    //void - ничиег оне возвращает
}

export const Todolist = (props: TodolistPropsType) => {

// //=======Добавление таски======================================================
    const [addTitle, setAddTitle] = useState('')
//
    // //Удаление ==============================================================
    const onClickHandlerDelete=(elTask:string)=>{
        props.deleteTask(elTask)
    }

    //Фильтр ==================================================
    // const [filterValue, setFilterValue] = useState("All");
    //
    // let filterTasks = props.tasks;
    // if (filterValue === 'Active') {
    //     filterTasks = props.tasks.filter((el) => el.isDone);
    // }
    // if (filterValue === 'Completed') {
    //     filterTasks = props.tasks.filter(el => !el.isDone);
    //
    // }
    const changeTasksFilterHandler = (filterValue: filterValueType) => {
        props.setFilterValue(filterValue);
    }
    //===========Добавление таски==================================================
    const onClickHandlerAddTask = () => {
        props.addTask(addTitle)
        setAddTitle('')
    }
//===========================================================

    return (
        <div>
            <h3>{props.title}</h3>
{/*
            ниверсальный включает в себе и инпут и баттон
*/}
            {/*<FullInput setAddTitle={setAddTitle} addTitle={addTitle} addTask={props.addTask}/>*/}
            {/*<FullInput  addTask={props.addTask} setAddTitle={setAddTitle} addTitle={addTitle}/>*/}
            <UniversalInput setAddTitle={setAddTitle}  addTitle={addTitle} callback={onClickHandlerAddTask}/>
            <Button name='+' callBack={()=>onClickHandlerAddTask()}/>
            {/*<div>*/}
            {/*    <input*/}
            {/*        value={addTitle}*/}
            {/*        onChange={onChangeHandlerAddTask}*/}
            {/*        onKeyDown={onKeyDownHandler}*/}
            {/*    />*/}
            {/*    <Button name='+' callBack={onClickHandlerAddTask}/>*/}
            {/*    /!*<button onClick={onClickHandlerAddTask}>+</button>*!/*/}
            {/*</div>*/}
            <ul>
                {props.tasks.map(elTask => {//elTasks - элемент каждого обьекта в массиве
                    // //Удаление ==============================================================
                    // const onClickHandlerDelete=()=>{
                    //     props.deleteTask(elTask.id)
                    // }
                    return (
                        <li key={elTask.id}>
                            {/*<button onClick={props.deleteTask}>x</button>/!*делаем ссылку на функцию, но не можем ничег опередать на верх*!/*/}
                            <Button name='x' callBack={()=>onClickHandlerDelete(elTask.id)}/>
                            {/*<button onClick={()=>onClickHandlerDelete(elTask.id)}>x</button>*/}
                            {/*можем передать на верх*/}
                            <input type="checkbox" checked={elTask.isDone}/>
                            <span>{elTask.title}</span></li>
                    );
                })}
            </ul>
            <div>
                <Button name='All' callBack={()=>changeTasksFilterHandler("All")}/>
                <Button name='Active' callBack={()=>changeTasksFilterHandler("Active")}/>
                <Button name='Completed' callBack={()=>changeTasksFilterHandler("Completed")}/>
                {/*<button onClick={() => changeTasksFilter("All")}>All</button>*/}
                {/*<button onClick={() => changeTasksFilter("Active")}>Active</button>*/}
                {/*<button onClick={() => changeTasksFilter("Completed")}>Completed</button>*/}
            </div>
        </div>
    );
}