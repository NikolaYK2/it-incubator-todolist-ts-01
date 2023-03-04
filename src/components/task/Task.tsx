import React, {useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {Bookmark, BookmarkBorder} from "@mui/icons-material";
import {changeStatusAC, changeTaskTitleAC, deleteTaskAC} from "../../reducers/tasksReducer";
import {useDispatch} from "react-redux";
import s from "../../Todolist.module.css";
import {Button} from "../button/Button";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../api/todolistsApi";

export type  TaskTypeP ={
    task: TaskType,
    idTodolist: string
}
export const Task = React.memo((props:TaskTypeP) => {
    const {id, status, title} = props.task
    const dispatch = useDispatch();

    //============CHecked===============================
    const changeStatusHandler = useCallback((taskId: string, status: TaskStatuses,) => {
        dispatch(changeStatusAC(taskId, status ? TaskStatuses.New : TaskStatuses.Completed, props.idTodolist))
        // props.changeStatus(taskId, filter, props.todoListID)
    },[dispatch, props.idTodolist]);

    // //Удаление таски==============================================================
    const onClickHandlerDeleteTask = useCallback((Task: string) => {
        // props.deleteTask(props.todoListID, Task,)
        dispatch(deleteTaskAC(props.idTodolist, Task))
    }, [dispatch, props.idTodolist]);

    //====Редактирование в task title===============================================
    const onChangeHandlerTitle = useCallback((taskId: string, newValue: string,) => {
        // props.changeTaskTitle(taskId, newValue, props.todoListID)
        //props.todoListID что б знали наверху в каком тудулисте поменять
        dispatch(changeTaskTitleAC(taskId, newValue, props.idTodolist))

    }, [dispatch, props.idTodolist]);

    return (
        <>
                {/*<button onClick={props.deleteTask}>x</button>/!*делаем ссылку на функцию, но не можем ничего передать на верх*!/*/}
                {/*<button onClick={()=>onClickHandlerDelete(elTask.id)}>x</button> можем передать на верх*/}
                <Button callBack={() => onClickHandlerDeleteTask(id)} style={s.dellTask}/>
                <Checkbox
                    checked={status === TaskStatuses.Completed}
                    onChange={() => changeStatusHandler(id, status)}
                    icon={<BookmarkBorder/>}
                    checkedIcon={<Bookmark/>}
                    style={{color: 'darkred'}}
                />
                {/*<input type="checkbox" checked={Task.isDone}*/}
                {/*       onChange={(event) => changeStatusHandler(Task.id, event.currentTarget.checked,)}/>*/}
                <EditableSpan title={title} onChange={(newValue) => onChangeHandlerTitle(id, newValue)}/>
                {/*<span className={s.text}>{Task.title}</span>*/}
        </>
    );
});

