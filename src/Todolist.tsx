import React from "react";
import {Button} from "./components/button/Button";
import s from "./Todolist.module.css";
import {FullInput} from "./components/fullInputButton/FullInput";
import {EditableSpan} from "./components/editableSpan/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Bookmark, BookmarkBorder, Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./reducers/store";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, deleteTaskAC, TasksPropsType} from "./reducers/tasksReducer";
import {
    changeTasksFilterAC,
    deleteTodolistAC,
    filterValueType,
    onChangeTitleTodolistAC, TodolistType
} from "./reducers/todoListsReducer";

export type TodolistPropsType = {
    todolist : TodolistType
    // todoListID: string;
    // title: string,
    // // tasks: TasksPropsType[],
    // // changeStatus: (taskId: string, isDone: boolean, id: string) => void,
    // // deleteTask: (id: string, idId: string,) => void,
    // // addItem: (id: string, addTitle: string) => void
    // // changeTasksFilter: (filterValue: filterValueType) => void,//если параметр не передаем то пустая функция
    // // changeTaskTitle: (id: string, newValue: string, taskId: string,) => void,//редактирование title tasks
    // deleteTodolist: (id: string) => void
    // // changeTasksFilter: (id: string, filter: filterValueType,) => void
    // // onChangeHandlerTitleTodolist: (todoId: string, newValue: string,) => void,//изм. title todolist
    // filter: filterValueType,
    // //void - ничиег оне возвращает
}

export const Todolist = (props: TodolistPropsType) => {
    const {id, title, filter} = props.todolist
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, TasksPropsType[]>((state)=>state.tasks[id]);
//=======Добавление таски=====================================================================================================
//     const addTask = (addTitle: string, todolistID: string) => {
// //         setTasks([{id: v1(), title: addTitle, isDone: false}, ...tasks,])
// // Acc. масс. =====================================================================
// // const todoListsTasks = tasks[todolistID];
// //         const updatedTasks = [{id: v1(), title: addTitle, isDone: false}, ...todoListsTasks];
// //         const copyTasks = {...tasks};
// //         copyTasks[todolistID] = updatedTasks;
// //         setTasks(copyTasks);
// //         Сокращенный вариант=================================================================
// //         setTasks({...tasks, [todolistID]: [{id: v1(), title: addTitle, isDone: false}, ...tasks[todolistID]]})
// //         ...tasks- раскрываем все такси и делаем копию,
// //         В объекте есть св-в[todolistID] в которое вносим изм.
// //         [todolistID]: [кладем сюда новый массив и все старые таски]Закидываем старые 4 таксик ...tasks[todolistID + одну новую {id: v1(), title: addTitle, isDone: false}
//         dispatch(addTaskAC(addTitle, todolistID))
//     }
//Удаление таски ===============================================================================================================
//     const deleteTask = (todolistID: string, tId: string,) => {
//         // tasks = tasks.filter((el) => el.id !== elId)
//         // setTasks(tasks.filter((el) => el.id !== elId));//для обычного массива методы
//         //Ассоциативный массив =======================================
//         // const todoListsTasks = tasks[todolistID];
//         // const updatedTasks = todoListsTasks.filter(el=>el.id !== elId)
//         // const copyTasks = {...tasks}
//         // copyTasks[todolistID] = updatedTasks
//         // setTasks(copyTasks);
//         //Сокращенный вариант ================================================
//         // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== tId)})
//         //tasks[todolistID] не надо, так как мы уже в объекте после копии ...tasks, по этому просто [todolistID]
//         dispatch(deleteTaskAC(todolistID, tId))
//     }
// Передача наверх изм. title tasks=============================================================================
//     const changeTaskTitle = (taskId: string, newValue: string, todolistID: string) => {
//         // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
//         dispatch(changeTaskTitleAC(taskId, newValue, todolistID))
//     }

    //================addTask===================================================
    const addTask = (addTitle: string) => {
        dispatch(addTaskAC(addTitle, id))

        // props.addItem(title, props.todoListID);
    }
    // //Удаление таски==============================================================
    const onClickHandlerDelete = (Task: string) => {
        // props.deleteTask(props.todoListID, Task,)
        dispatch(deleteTaskAC(id, Task))

    }
    //====Редактирование в task title===============================================
    const onChangeHandlerTitle = (taskId: string, newValue: string,) => {
        // props.changeTaskTitle(taskId, newValue, props.todoListID)
        //props.todoListID что б знали наверху в каком тудулисте поменять
        dispatch(changeTaskTitleAC(taskId, newValue, id))

    }

    //status task========================================================================
    // const changeStatus = (taskId: string, isDone: boolean, todolistID: string) => {//отображения статуса таски true или false
    //     //     let task = tasks.map((t) => t.id === taskId ? {...t, /*isDone: isDone - это*/ isDone} : t);
    //     // }
    //     //======Ассациативный ================
    //     // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone} : t)})
    //     dispatch(changeStatusAC(taskId, isDone, todolistID))
    // }

    // delete todolist=======================================
    const onClickHandlerDeleteTodolist = (todolistID: string) => {
        dispatch(deleteTodolistAC(todolistID))
    }
    //===============================================================
    //=========================ФиЛЬТРАЦИЯ==============================
    let filterTasks = tasks;//[tl.id] - обращение к конкретному тудулисту, то есть его id
    if (filter === "Active") {
        // filterTasks = tasks.filter((el) => el.isDone);
        //Ассоциативный ===================================================
        filterTasks = tasks.filter(t => t.isDone);
    }
    if (filter === "Completed") {
        // filterTasks = tasks.filter(el => !el.isDone);
        //Ассоциативный ===================================================
        filterTasks = tasks.filter(t => !t.isDone);
    }
    //==================================================================

    // =====================================================================
    //Если лист тасок остался пустой
    const taskListItems = tasks.length
        ? filterTasks.map(Task => {//elTasks - элемент каждого обьекта в массиве
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
                    <Button callBack={() => onClickHandlerDelete(Task.id)} style={s.dellTask}/>
                    <Checkbox
                        checked={Task.isDone}
                        onChange={(event) => changeStatusHandler(Task.id, event.currentTarget.checked,)}
                        icon={<BookmarkBorder/>}
                        checkedIcon={<Bookmark/>}
                        style={{color:'darkred'}}
                    />
                    {/*<input type="checkbox" checked={Task.isDone}*/}
                    {/*       onChange={(event) => changeStatusHandler(Task.id, event.currentTarget.checked,)}/>*/}
                    <EditableSpan title={Task.title} onChange={(newValue) => onChangeHandlerTitle(Task.id, newValue)}/>
                    {/*<span className={s.text}>{Task.title}</span>*/}
                </li>
            );
        })
        : <div className={s.tasksNull}>Task list is empty</div>;

//===============================================================================
//Фильтр ==================================================
    const changeTasksFilterHandler = (filter: filterValueType,) => {
        dispatch(changeTasksFilterAC(id, filter,))
        // props.changeTasksFilter(props.todoListID, filter,);
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
    const changeStatusHandler = (taskId: string, isDone: boolean,) => {
        dispatch(changeStatusAC(taskId, isDone, id))

        // props.changeStatus(taskId, filter, props.todoListID)
    }
//=====State Ошибка в случаи попытка отправки пустого поля========================
//     let [error, setError] = useState<string | null>(null)
//     const errorStop = error ? s.error : '';
//=====================================================================
//=================Focus button filter===================================
//filterValue - добавили фильтр из локального стейка
    const buttonAll = filter === "All" ? s.active : s.default;
    const buttonActive = filter === "Active" ? s.active : s.default;
    const buttonCompleted = filter === "Completed" ? s.active : s.default;
// =============================================================================
    //Изм. todolist======================================================================================
    const onChangeHandlerTitleTodolist = (newValue: string) => {
            dispatch(onChangeTitleTodolistAC(newValue, id))
        // props.onChangeHandlerTitleTodolist(newValue, props.todoListID,)
    }
    // ========================================================================================================


    return (
        <div>
            <h3><EditableSpan title={title} onChange={onChangeHandlerTitleTodolist}/></h3>
            {/*<button className={s.todolistTitle} onClick={onClickHandlerDeleteTodolist}>x</button>*/}
            <IconButton onClick={()=>onClickHandlerDeleteTodolist(id)} color={'error'}>
                <Delete/>
            </IconButton>
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

