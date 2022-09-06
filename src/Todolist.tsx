import React from "react";
import {Button} from "./components/button/Button";
import {filterValueType} from "./App";
import s from "./Todolist.module.css";
import {FullInput} from "./components/fullInputButton/FullInput";
import {EditableSpan} from "./components/editableSpan/EditableSpan";

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
    deleteTask: (id: string, idId: string,) => void,
    deleteTodolist: (id: string) => void
    addItem: (id: string, addTitle: string) => void
    // changeTasksFilter: (filterValue: filterValueType) => void,//если параметр не передаем то пустая функция
    changeTasksFilter: (id: string, filter: filterValueType,) => void
    changeTaskTitle:(id: string, newValue: string, taskId: string,)=>void,//редактирование title tasks
    onChangeHandlerTitleTodolist:(todoId: string, newValue: string,)=>void,//изм. title todolist
    filter: filterValueType,
    //void - ничиег оне возвращает
}

export const Todolist = (props: TodolistPropsType) => {
    //================addTask===================================================
    const addTask = (title: string) => {
        props.addItem(title, props.todoListID);
    }
    // //Удаление таски==============================================================
    const onClickHandlerDelete = (Task: string) => {
        props.deleteTask(props.todoListID, Task,)
    }
    //====Редактирование в task title===============================================
    const onChangeHandlerTitle = (taskId: string, newValue: string,) => {
        props.changeTaskTitle(taskId, newValue, props.todoListID)
        //props.todoListID что б знали наверху в каком тудулисте поменять
    }

    //========================================================================
    // delete todolist=======================================
    const onClickHandlerDeleteTodolist = () => {
        props.deleteTodolist(props.todoListID);
    }
    //===============================================================
    // =====================================================================
    //Если лист тасок остался пустой
    const taskListItems = props.tasks.length
        ? props.tasks.map(Task => {//elTasks - элемент каждого обьекта в массиве
            // //Удаление ==============================================================
            // const onClickHandlerDelete=()=>{
            //     props.deleteTask(elTask.id)
            // }
            // изменение в title========================================
            // const onChangeHandlerTitle = (newValue: string) => {
            //     props.changeTaskTitle(Task.id, newValue, props.todoListID)
            //     //props.todoListID что б знали наверху в каком тудулисте поменять
            // }
            return (
                <li key={Task.id} className={Task.isDone ? s.activeTask : ''}>
                    {/*<button onClick={props.deleteTask}>x</button>/!*делаем ссылку на функцию, но не можем ничего передать на верх*!/*/}
                    {/*<button onClick={()=>onClickHandlerDelete(elTask.id)}>x</button> можем передать на верх*/}
                    <Button name='x' callBack={() => onClickHandlerDelete(Task.id)}/>
                    <input type="checkbox" checked={Task.isDone}
                           onChange={(event) => changeStatusHandler(Task.id, event.currentTarget.checked,)}/>
                    <EditableSpan title={Task.title} onChange={(newValue)=>onChangeHandlerTitle(Task.id, newValue)}/>
                    {/*<span className={s.text}>{Task.title}</span>*/}
                </li>
            );
        })
        : <div className={s.tasksNull}>Task list is empty</div>;

//===============================================================================
//Фильтр ==================================================
    const changeTasksFilterHandler = (filter: filterValueType,) => {
        props.changeTasksFilter(props.todoListID, filter,);
    }

//===========Добавление таски==================================================
    //=======State Добавление таски======================================================
    // const [addTitle, setAddTitle] = useState<string>('')
    //
    // const onClickHandlerAddTask = () => {
    //     if (addTitle.trim() !== '') {//что-б и пробелы не считались за символы, убираем
    //         props.addTask(addTitle.trim(), props.todoListID)//trim()- убираем пробелы вначале и конце
    //         setAddTitle('')
    //     } else {
    //         setError('Заполни полe Чувак!')
    //     }
    // }
//===========================================================
//============CHecked===============================
    const changeStatusHandler = (taskId: string, filter: boolean,) => {
        props.changeStatus(taskId, filter, props.todoListID)
    }
//=====State Ошибка в случаи попытка отправки пустого поля========================
//     let [error, setError] = useState<string | null>(null)
//     const errorStop = error ? s.error : '';
//=====================================================================
//=================Focus button filter===================================
//filterValue - добавили фильтр из локального стейка
    const buttonAll = props.filter === "All" ? s.active : '';
    const buttonActive = props.filter === "Active" ? s.active : '';
    const buttonCompleted = props.filter === "Completed" ? s.active : '';
// =============================================================================
    //Изм. todolist======================================================================================
    const onChangeHandlerTitleTodolist =(newValue: string)=>{
        props.onChangeHandlerTitleTodolist(props.todoListID, newValue)
    }
    // ========================================================================================================
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeHandlerTitleTodolist}/></h3>
            <button className={s.todolistTitle} onClick={onClickHandlerDeleteTodolist}>x</button>
            <div className={s.block}>
                <FullInput addItem={addTask}/>
                {/*<UniversalInput setAddTitle={setAddTitle}*/}
                {/*                addTitle={addTitle}*/}
                {/*                callback={onClickHandlerAddTask}*/}
                {/*                setError={setError}*/}
                {/*                style={errorStop}/>*/}

                {/*<Button name='+' callBack={() => onClickHandlerAddTask()}/>*/}
                {/*{error && <div className={`${errorStop} ${s.block}`}>{error}</div>}*/}
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

