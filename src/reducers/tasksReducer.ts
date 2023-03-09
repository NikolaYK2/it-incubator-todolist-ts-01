import {v1} from "uuid";
import {AddTodolistACType, DeleteTodolistACType, SetTodolistsACType} from "./todoListsReducer";
import {TaskStatuses, TaskType, todolistsApi, TodoTaskPriorities} from "../api/todolistsApi";
import {Dispatch} from "redux";

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
            return {
                ...state,
                [action.payload.todolistID]: [{
                    id: v1(),
                    title: action.payload.addTitle,
                    status: TaskStatuses.New,
                    addedDate: '',
                    startDate: '',
                    deadline: '',
                    order: 0,
                    priority: TodoTaskPriorities.Low,
                    todoListId: action.payload.todolistID,
                    description: ''
                }, ...state[action.payload.todolistID]]
            };
        }
        case 'ADD-TODO': {
            //Сокращенный вариант ================================================
            // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== tId)})
            //tasks[todolistID] не надо, так как мы уже в объекте после копии ...tasks, по этому просто [todolistID]
            // return {...state, [action.payload.todolistID]: []}
            return {...state, [action.payload.todolistID]: []};
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
        case 'DELETE-TODO': {
            // const {[action.payload.todolistID]:[], ...rest} = {...state}
            // return rest;
            let copyState = {...state}
            delete copyState[action.payload.todolistID];
            return copyState;
        }
        case 'CHANGE-TASK-TITLE': {
            // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(task => task.id === action.payload.taskId ?
                    {...task, title: action.payload.newValue} : task)
            }
        }
        case 'CHANGE-STATUS-TASK': {
            // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(task => task.id === action.payload.taskId ?
                    {...task, status: action.payload.status} : task)
            }
        }
        case 'SET-TODOLISTS': {
            // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
            const copy = {...state};
            action.payload.todoLists.forEach(tl => {
                copy[tl.id] = [];
            });
            return copy;
        }
        case 'SET-TASKS': {
            // const copy = {...state};
            // copy[action.payload.todolistID] = action.payload.tasks;
            // return copy;
            return {...state, [action.payload.todolistID]: [...action.payload.tasks]}
        }

        default:
            return state

    }
};

type complexACType = AddTaskACType
    /*| AddTaskTodoACType*/
    | DeleteTaskACType
    | ChangeTaskTitleACType
    | ChangeStatusACACType
    /*| DeleteTaskTodoACType*/
    | AddTodolistACType
    | DeleteTodolistACType
    | SetTodolistsACType //Используем action todolista
    | SetTasksACType;


type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (addTitle: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            addTitle,
            todolistID,
        }
    } as const;
}

// type AddTaskTodoACType = ReturnType<typeof addTaskTodoAC>
// export const addTaskTodoAC = (todolistID: string) => {
//     return {
//         type: 'ADD-TASK-TODO',
//         payload: {
//             todolistID,
//         }
//     } as const;
// }

type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todolistID: string, tId: string,) => {
    return {
        type: 'DELL-TASK',
        payload: {
            todolistID,
            tId,
        }
    } as const;
}

// type DeleteTaskTodoACType = ReturnType<typeof deleteTaskTodoAC>
// export const deleteTaskTodoAC = (todolistID: string) => {
//     return {
//         type: 'DELL-TASK-TODO',
//         payload: {
//             todolistID,
//         }
//     } as const;
// }

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, newValue: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId,
            newValue,
            todolistID,
        }
    } as const;
}

type ChangeStatusACACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (taskId: string, status: TaskStatuses, todolistID: string) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {
            taskId,
            status,
            todolistID,
        }
    } as const;
}

type SetTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistID: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todolistID,
            tasks,
        }
    } as const;
}


//THUNK =============================================================
export const setTasksTC=(todolistID:string)=>{
    return (dispatch: Dispatch<complexACType>)=>{
        todolistsApi.getTasks(todolistID)
            .then(res=>{
                dispatch(setTasksAC(todolistID, res.data.items))
            })
    }
}