import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";
import {Button} from "./components/button/Button";
import {filterValueType, TodolistType} from "./App";
import {UniversalInput} from "./components/input/UniversalInput";
import s from "./Todolist.module.css";

export type TasksPropsType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type TodolistPropsType = {
    todoListID: string,
    changeStatus: (taskId: string, isDone: boolean, id: string) => void,
    title: string,
    tasks: TasksPropsType[],
    deleteTask: (idId: string, id: string) => void,
    deleteTodolist:(id: string)=>void
    addTask: (addTitle: string, id: string) => void
    // changeTasksFilter: (filterValue: filterValueType) => void,//если параметр не передаем то пустая функция
    changeTasksFilter: (filter: filterValueType, id: string) => void
    filter: filterValueType,
    //void - ничиег оне возвращает
}

export const Todolist = (props: TodolistPropsType) => {

    // //Удаление таски==============================================================
    const onClickHandlerDelete = (Task: string) => {
        props.deleteTask(Task, props.todoListID)
    }
    // delete todolist=======================================
    const onClickHandlerDeleteTodolist =()=>{
        props.deleteTodolist(props.todoListID);
    }
    //Если лист тасок остался пустой
    const taskListItems = props.tasks.length
        ? props.tasks.map(Task => {//elTasks - элемент каждого обьекта в массиве
            // //Удаление ==============================================================
            // const onClickHandlerDelete=()=>{
            //     props.deleteTask(elTask.id)
            // }
            return (
                <li key={Task.id} className={Task.isDone ? s.activeTask : ''}>
                    {/*<button onClick={props.deleteTask}>x</button>/!*делаем ссылку на функцию, но не можем ничего передать на верх*!/*/}
                    {/*<button onClick={()=>onClickHandlerDelete(elTask.id)}>x</button> можем передать на верх*/}
                    <Button name='x' callBack={() => onClickHandlerDelete(Task.id)}/>
                    <label>
                        <input type="checkbox" checked={Task.isDone}
                               onChange={(event) => changeStatusHandler(Task.id, event.currentTarget.checked,)}/>
                        <span className={s.text}>{Task.title}</span>
                    </label>
                </li>
            );
        })
        : <div className={s.tasksNull}>Task list is empty</div>;

//===============================================================================
//Фильтр ==================================================
    const changeTasksFilterHandler = (filter: filterValueType,) => {
        props.changeTasksFilter(filter, props.todoListID);
    }

//===========Добавление таски==================================================
    //=======State Добавление таски======================================================
    const [addTitle, setAddTitle] = useState<string>('')

    const onClickHandlerAddTask = () => {
        if (addTitle.trim() !== '') {//что-б и пробелы не считались за символы, убираем
            props.addTask(addTitle.trim(), props.todoListID)//trim()- убираем пробелы вначале и конце
            setAddTitle('')
        } else {
            setError('Заполни полe Чувак!')
        }
    }
//===========================================================
//============CHecked===============================
    const changeStatusHandler = (taskId: string, filter: boolean,) => {
        props.changeStatus(taskId, filter, props.todoListID)
    }
//=====State Ошибка в случаи попытка отправки пустого поля========================
    let [error, setError] = useState<string | null>(null)
    const errorStop = error ? s.error : '';
//=====================================================================
//=================Focus button filter===================================
//filterValue - добавили фильтр из локального стейка
    const buttonAll = props.filter === "All" ? s.active : '';
    const buttonActive = props.filter === "Active" ? s.active : '';
    const buttonCompleted = props.filter === "Completed" ? s.active : '';
// =======================================================================
    return (
        <div>
            <h3>{props.title}</h3>
            <button className={s.todolistTitle} onClick={onClickHandlerDeleteTodolist}>x</button>
            {/*ниверсальный включает в себе и инпут и баттон*/}
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
                {taskListItems}
                {/*//==========================================================================================*/}
                {/*//================================================================================================*/}
                {/*{props.tasks.map(elTask => {//elTasks - элемент каждого обьекта в массиве*/}
                {/*    // //Удаление ==============================================================*/}
                {/*    // const onClickHandlerDelete=()=>{*/}
                {/*    //     props.deleteTask(elTask.id)*/}
                {/*    // }*/}
                {/*    return (*/}
                {/*        <li key={elTask.id} className={elTask.isDone ? s.activeTask : ''}>*/}
                {/*            /!*<button onClick={props.deleteTask}>x</button>/!*делаем ссылку на функцию, но не можем ничего передать на верх*!/*!/*/}
                {/*            /!*<button onClick={()=>onClickHandlerDelete(elTask.id)}>x</button> можем передать на верх*!/*/}
                {/*            <Button name='x' callBack={() => onClickHandlerDelete(elTask.id)}/>*/}
                {/*            <label>*/}
                {/*                <input type="checkbox" checked={elTask.isDone}*/}
                {/*                       onChange={(event) => changeStatus(elTask.id, event.currentTarget.checked)}/>*/}
                {/*                /!*onChange={(event) => checkedTaskHandler(elTask.id, event.currentTarget.checked)}/>*!/*/}
                {/*                <span className={s.text}>{elTask.title}</span>*/}
                {/*            </label>*/}
                {/*        </li>*/}
                {/*    );*/}
                {/*})}*/}
            </ul>
            <div>
                <Button name='All' callBack={() => changeTasksFilterHandler("All")} style={buttonAll}/>
                <Button name='Active' callBack={() => changeTasksFilterHandler("Active")} style={buttonActive}/>
                <Button name='Completed' callBack={() => changeTasksFilterHandler("Completed")} style={buttonCompleted}/>
                {/*<button onClick={() => changeTasksFilter("All")}>All</button>*/}
                {/*<button onClick={() => changeTasksFilter("Active")}>Active</button>*/}
                {/*<button onClick={() => changeTasksFilter("Completed")}>Completed</button>*/}
            </div>
        </div>
    );
}