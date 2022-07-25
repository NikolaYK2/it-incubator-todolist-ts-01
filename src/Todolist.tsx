import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type TasksPropsType = {
    id: string,
    title: string,
    isDone: boolean,
}
type TodolistPropsType = {
    title: string,
    tasks: TasksPropsType[]
    deleteTask: (idId: string) => void,
    addTask: (addTitle: string) => void
    callBackButtonAdd: () => void
    // changeTasksFilter: (el: string) => void,//если параметр не передаем то пустая функция
    //void - ничиег оне возвращает
}

export const Todolist = (props: TodolistPropsType) => {

    const [filterValue, setFilterValue] = useState("All");

    let filterTasks = props.tasks;
    if (filterValue === 'Active') {
        filterTasks = props.tasks.filter((el) => el.isDone);
    }
    if (filterValue === 'Completed') {
        filterTasks = props.tasks.filter(el => !el.isDone);

    }
    const changeTasksFilter = (butName: string) => {
        setFilterValue(butName);
    }
    //=============================================================
//=======Добавление таски======================================================
    const [addTitle, setAddTitle] = useState('')
    const onClickHandlerAddTask = () => {
        props.addTask(addTitle)
        setAddTitle('')
    }
    const onChangeHandlerAddTask =(event: ChangeEvent<HTMLInputElement>)=>{
        setAddTitle(event.currentTarget.value)
    }

    //Кнопка ввода ENter==================================================
    const onKeyDownHandler =(event: KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === "Enter"){
            onClickHandlerAddTask()
        }
    }
    // //Удаление ==============================================================
    const onClickHandlerDelete=(elTask:string)=>{
        props.deleteTask(elTask)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={addTitle}
                    onChange={onChangeHandlerAddTask}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={onClickHandlerAddTask}>+</button>
            </div>
            <ul>
                {filterTasks.map(elTask => {//elTasks - элемент каждого обьекта в массиве
                    // //Удаление ==============================================================
                    // const onClickHandlerDelete=()=>{
                    //     props.deleteTask(elTask.id)
                    // }

                    return (
                        <li key={elTask.id}>
                            {/*<button onClick={props.deleteTask}>x</button>/!*делаем ссылку на функцию, но не можем ничег опередать на верх*!/*/}
                            <button onClick={()=>onClickHandlerDelete(elTask.id)}>x</button>
                            {/*можем передать на верх*/}
                            <input type="checkbox" checked={elTask.isDone}/>
                            <span>{elTask.title}</span></li>
                    );
                })}
            </ul>
            <div>
                <button onClick={() => changeTasksFilter("All")}>All</button>
                <button onClick={() => changeTasksFilter("Active")}>Active</button>
                <button onClick={() => changeTasksFilter("Completed")}>Completed</button>
            </div>
        </div>
    );
}