import React, {useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {Bookmark, BookmarkBorder} from "@mui/icons-material";
import {deleteTasksTC, updateTaskTC} from "../../tasksReducer";
import {useDispatch} from "react-redux";
import s from "../Todolist.module.css";
import {Button} from "../../../../components/button/Button";
import {EditableSpan} from "../../../../components/editableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../../../api/todolistsApi";
import {AppThunkDispatch} from "../../../../app/store";

export type  TaskTypeP = {
    task: TaskType,
    idTodolist: string,
    disabled?:boolean,
}
export const Task = React.memo((props: TaskTypeP) => {
    const {id, status, title} = props.task
    const dispatch = useDispatch<AppThunkDispatch>();

    //============CHecked===============================
    const changeTaskStatusHandler = useCallback((taskId: string, status: TaskStatuses) => {
        // dispatch(changeStatusAC(taskId, status ? TaskStatuses.New : TaskStatuses.Completed, props.idTodolist))
        // props.changeStatus(taskId, filter, props.todoListID)

        dispatch(updateTaskTC(props.idTodolist, taskId, {status: status ? TaskStatuses.New : TaskStatuses.Completed}))

    }, [dispatch, props.idTodolist]);

    // //Удаление таски==============================================================
    const onClickHandlerDeleteTask = useCallback((todoId:string, taskId: string, ) => {
        // props.deleteTask(props.todoListID, taskId)
        // dispatch(deleteTaskAC(props.idTodolist, taskId))

        // todolistsApi.deleteTask(todoId, taskId)
        //     .then(res=>{
        //         dispatch(deleteTaskAC(todoId, taskId))
        //     })
        dispatch(deleteTasksTC(todoId, taskId));
    }, [dispatch, props.idTodolist]);

    //====Редактирование в task title===============================================
    const onChangeHandlerTitle = useCallback((taskId: string, newValue: string,) => {
        // props.changeTaskTitle(taskId, newValue, props.todoListID)
        //props.todoListID что б знали наверху в каком тудулисте поменять
        // dispatch(changeTaskTitleAC(taskId, newValue, props.idTodolist))
        dispatch(updateTaskTC(props.idTodolist, taskId, {title: newValue}))

    }, [dispatch, props.idTodolist]);

    return (
        <>
            {/*<button onClick={props.deleteTask}>x</button>/!*делаем ссылку на функцию, но не можем ничего передать на верх*!/*/}
            {/*<button onClick={()=>onClickHandlerDelete(elTask.id)}>x</button> можем передать на верх*/}
            <Button callBack={() => onClickHandlerDeleteTask(props.idTodolist, id)}
                    style={s.dellTask}
                    disabled={props.task.entityStatus === 'loading'}
            />
            <Checkbox
                checked={status === TaskStatuses.Completed}
                onChange={() => changeTaskStatusHandler(id, status)}
                icon={<BookmarkBorder/>}
                checkedIcon={<Bookmark/>}
                style={{color: 'darkred'}}
                disabled={props.task.entityStatus === 'loading'}
            />
            {/*<input type="checkbox" checked={Task.isDone}*/}
            {/*       onChange={(event) => changeStatusHandler(Task.id, event.currentTarget.checked,)}/>*/}
            <EditableSpan title={title} onChange={(newValue) => onChangeHandlerTitle(id, newValue)}/>
            {/*<span className={s.text}>{Task.title}</span>*/}
        </>
    );
});

