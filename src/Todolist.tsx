import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";
import {Button} from "./components/button/Button";
import {filterValueType} from "./App";
import {FullInput} from "./components/fullInputButton/FullInput";
import {UniversalInput} from "./components/input/UniversalInput";
import s from "./Todolist.module.css";

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
    // changeTasksFilter: (filterValue: filterValueType) => void,//если параметр не передаем то пустая функция
    setFilterValue: (filterValue: filterValueType) => void
    checkedTask: (newId: string, value: boolean) => void
    filterValue?: filterValueType,
    //void - ничиег оне возвращает
}

export const Todolist = (props: TodolistPropsType) => {

// //=======Добавление таски======================================================
    const [addTitle, setAddTitle] = useState('')
//
    // //Удаление ==============================================================
    const onClickHandlerDelete = (elTask: string) => {
        props.deleteTask(elTask)
    }
//===============================================================================
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
        if (addTitle !== '') {
            props.addTask(addTitle.trim())//trim()- убираем пробелы вначале и конце
            setAddTitle('')
        } else {
            setError('Заполни полe Чувак!')
        }
    }
//===========================================================
    //============CHecked===============================
    const checkedTaskHandler = (newId: string, value: boolean) => {
        props.checkedTask(newId, value)
    }
    //=====Ошибка в случаи попытка отправки пустого поля========================
    let [error, setError] = useState<string | null>(null)

    const errorStop = error ? s.error : '';
//=====================================================================
    //=================FOcus button filter===================================
    const buttonAll =  props.filterValue === "All" ? s.active : '';
    const buttonActive =  props.filterValue === "Active" ? s.active : '';
    const buttonCompleted =  props.filterValue === "Completed" ? s.active : '';
    // =======================================================================
    return (
        <div>
            <h3>{props.title}</h3>
            {/*
            ниверсальный включает в себе и инпут и баттон
*/}
            {/*<FullInput setAddTitle={setAddTitle} addTitle={addTitle} addTask={props.addTask}/>*/}
            {/*<FullInput  addTask={props.addTask} setAddTitle={setAddTitle} addTitle={addTitle}/>*/}
            <div className={s.block}>
                <UniversalInput setAddTitle={setAddTitle}
                                addTitle={addTitle}
                                callback={onClickHandlerAddTask}
                                setError={setError}
                                style={errorStop}/>

                <Button name='+' callBack={() => onClickHandlerAddTask()}/>
                {error && <div className={`${errorStop} ${s.block}`}>{error}</div>}
            </div>
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
                        <li key={elTask.id} className={elTask.isDone ? s.activeTask : ''}>
                            {/*<button onClick={props.deleteTask}>x</button>/!*делаем ссылку на функцию, но не можем ничег опередать на верх*!/*/}
                            <Button name='x' callBack={() => onClickHandlerDelete(elTask.id)}/>
                            {/*<button onClick={()=>onClickHandlerDelete(elTask.id)}>x</button>*/}
                            {/*можем передать на верх*/}
                            <input type="checkbox" checked={elTask.isDone}
                                   onChange={(event) => checkedTaskHandler(elTask.id, event.currentTarget.checked)}/>
                            <span className={s.text}>{elTask.title}</span>
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button name='All' callBack={() => changeTasksFilterHandler("All")} style={buttonAll}/>
                <Button name='Active' callBack={() => changeTasksFilterHandler("Active") } style={buttonActive}/>
                <Button name='Completed' callBack={() => changeTasksFilterHandler("Completed")} style={buttonCompleted}/>
                {/*<button onClick={() => changeTasksFilter("All")}>All</button>*/}
                {/*<button onClick={() => changeTasksFilter("Active")}>Active</button>*/}
                {/*<button onClick={() => changeTasksFilter("Completed")}>Completed</button>*/}
            </div>
        </div>
    );
}