import {TaskStatuses, TaskType, todolistsApi, TodoTaskPriorities, UpdTaskType} from "../../api/todolistsApi";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import {AddTodoACType, DeleteTodoACType, SetTodoACType} from "./todoListsReducer";
import {setErrorAC, SetErrorACType, setStatusAC, SetStatusACType} from "../../app/appReducer";

// export type TasksPropsType = {
//     id: string,
//     title: string,
//     isDone: boolean,
// }
export type taskStateType = {
    [todolistID: string]: TaskType[];
}


export const initialState: taskStateType = {
    // [todolistID_1]: [
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: true},
    //     {id: v1(), title: "Next", isDone: false},
    // ],
    // [todolistID_2]: [
    //     {id: v1(), title: "Beer", isDone: true},
    //     {id: v1(), title: "Meat", isDone: true},
    //     {id: v1(), title: "Fish", isDone: true},
    //     {id: v1(), title: "Drink", isDone: false},
    // ],
}

export const tasksReducer = (state = initialState, action: complexACType): taskStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            //Сокращенный вариант=================================================================
            // setTasks({...tasks, [todolistID]: [{id: v1(), title: addTitle, isDone: false}, ...tasks[todolistID]]})
            //...tasks- раскрываем все такси и делаем копию,
            // В объекте есть св-в[todolistID] в которое вносим изм.
            // [todolistID]: [кладем сюда новый массив и все старые таски]Закидываем старые 4 таксик ...tasks[todolistID + одну новую {id: v1(), title: addTitle, isDone: false}
            const taskNew = action.payload.tasks
            return {...state, [taskNew.todoListId]: [taskNew, ...state[taskNew.todoListId]]};
        }
        case 'ADD-TODO': {
            //Сокращенный вариант ================================================
            // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== tId)})
            //tasks[todolistID] не надо, так как мы уже в объекте после копии ...tasks, по этому просто [todolistID]
            // return {...state, [action.payload.todolistID]: []}
            return {...state, [action.payload.todolist.id]: []};
        }
        case 'DELL-TASK': {
            //Сокращенный вариант ================================================
            // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== tId)})
            //tasks[todolistID] не надо, так как мы уже в объекте после копии ...tasks, по этому просто [todolistID]
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(task => task.id !== action.payload.tId)
            }
        }
        case 'DELETE-TODO':
            // const {[action.payload.todolistID]:[], ...rest} = {...state}
            // return rest;
            let copyState = {...state}
            delete copyState[action.payload.todolistID];
            return copyState;

        // case 'CHANGE-TASK-TITLE': {
        //     // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
        //     return {
        //         ...state,
        //         [action.payload.todolistID]: state[action.payload.todolistID].map(task => task.id === action.payload.taskId ?
        //             {...task, title: action.payload.newValue} : task)
        //     }
        // }
        case 'UPDATE-TASK': {
            // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(task => task.id === action.payload.taskId ?
                    {...task, ...action.payload.model} : task)
            }
        }
        case 'SET-TODOLISTS': {
            // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
            // const copy = {...state};
            // return action.payload.todoLists.reduce((acc, tl)=>{
            //     copy[tl.id] = [];
            //     return copy;
            // },{...state});//{...state} - То с чего нужно начать методу reduce
            const copy = {...state};
            action.payload.todoLists.forEach(tl => {//прост опробежим по всем еуду и присвоим пустой массив, map не нужен
                copy[tl.id] = [];
            });
            return copy;
            // const copy = state;
            //   action.payload.todoLists.map(e=>({...copy[e.id] = []}))
            // return copy
        }
        case 'SET-TASKS': {
            // const copy = {...state};
            // copy[action.payload.todolistID] = action.payload.tasks;
            // return copy;
            return {...state, [action.payload.todolistID]: action.payload.tasks}//[action.payload.tasks]- он и так массив, так что ...spred не нужно
        }

        default:
            return state

    }
};

//AC ===============================================================================
type complexACType =
    | DeleteTodoACType
    | SetTodoACType
    | AddTodoACType
    | SetErrorACType
    | SetStatusACType
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>;

/*| AddTaskTodoACType*/
// | ChangeTaskTitleACType
/*| DeleteTaskTodoACType*/
//Используем action todolista

export const addTaskAC = (tasks: TaskType) => ({type: 'ADD-TASK', payload: {tasks,}} as const)

// type AddTaskTodoACType = ReturnType<typeof addTaskTodoAC>
// export const addTaskTodoAC = (todolistID: string) => {
//     return {
//         type: 'ADD-TASK-TODO',
//         payload: {
//             todolistID,
//         }
//     } as const;
// }

export const deleteTaskAC = (todolistID: string, tId: string,) => ({
    type: 'DELL-TASK',
    payload: {todolistID, tId,}
} as const)

// type DeleteTaskTodoACType = ReturnType<typeof deleteTaskTodoAC>
// export const deleteTaskTodoAC = (todolistID: string) => {
//     return {
//         type: 'DELL-TASK-TODO',
//         payload: {
//             todolistID,
//         }
//     } as const;
// }

// type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
// export const changeTaskTitleAC = (taskId: string, newValue: string, todolistID: string) => {
//     return {
//         type: 'CHANGE-TASK-TITLE',
//         payload: {
//             taskId,
//             newValue,
//             todolistID,
//         }
//     } as const;
// }

export const updateTaskAC = (todolistID: string, taskId: string, model: UpdTaskTCType) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistID,
            taskId,
            model,
        }
    } as const;
}

export const setTasksAC = (todolistID: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS',
    payload: {todolistID, tasks,}
} as const)


// THUNK =========================================================================================================
export const setTasksTC = (todolistID: string) => (dispatch: Dispatch<complexACType>) => {
    dispatch(setStatusAC('loading'));
    todolistsApi.getTasks(todolistID)
        .then(res => {
            dispatch(setTasksAC(todolistID, res.data.items));
            dispatch(setStatusAC('succeeded'))
        })
}

export const deleteTasksTC = (todoId: string, taskId: string,) => (dispatch: Dispatch<complexACType>) => {
    todolistsApi.deleteTask(todoId, taskId)
        .then(res => {
            dispatch(deleteTaskAC(todoId, taskId))
        })
}

export const addTasksTC = (todoId: string, title: string) => (dispatch: Dispatch<complexACType>) => {
    dispatch(setStatusAC('loading'));

    todolistsApi.createTask(todoId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item));
                dispatch(setStatusAC('succeeded'));
            } else {
                if (res.data.messages.length){
                    dispatch(setErrorAC(res.data.messages[0]));
                }
                dispatch(setStatusAC('failed'));
            }

        })
}

export type UpdTaskTCType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TodoTaskPriorities,
    startDate?: string,
    deadline?: string,
}
export const updateTaskTC = (todoId: string, taskId: string, model: UpdTaskTCType) => {
    return (dispatch: Dispatch<complexACType>, getState: () => AppRootState) => {

        // const state = getState();
        // const task = state.tasks[todoId].find(t => t.id === taskId);

        // if (!task) {
        //     // throw new Error('task not found')
        //     console.warn('task not found');
        //     return;
        // }

        const task = getState().tasks[todoId].find(t => t.id === taskId);//Будет бежать по массиву только до первого совпадения

        if (task) {

            const apiModel: UpdTaskType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                // ...task - нельзя, отправим много чего лишнего
                ...model
            }
            todolistsApi.updateTask(todoId, taskId, apiModel)
                .then(res => {
                    dispatch(updateTaskAC(todoId, taskId, apiModel));
                })
        }
    }
}

