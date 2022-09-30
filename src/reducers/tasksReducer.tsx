import {taskStateType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: taskStateType, action: complexACType) => {
    switch (action.type) {
        case 'ADD-TASK': {
            //Сокращенный вариант=================================================================
            // setTasks({...tasks, [todolistID]: [{id: v1(), title: addTitle, isDone: false}, ...tasks[todolistID]]})
            //...tasks- раскрываем все такси и делаем копию,
            // В объекте есть св-в[todolistID] в которое вносим изм.
            // [todolistID]: [кладем сюда новый массив и все старые таски]Закидываем старые 4 таксик ...tasks[todolistID + одну новую {id: v1(), title: addTitle, isDone: false}
            return {...state, [action.payload.todolistID]:[{id: v1(), title: action.payload.addTitle, isDone: false}, ...state[action.payload.todolistID]]};
        }
        case 'ADD-TASK-TODO': {
            //Сокращенный вариант ================================================
            // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== tId)})
            //tasks[todolistID] не надо, так как мы уже в объекте после копии ...tasks, по этому просто [todolistID]
            return {...state, [action.payload.todolistID]: []}
        }
        case 'DELL-TASK': {
            //Сокращенный вариант ================================================
            // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== tId)})
            //tasks[todolistID] не надо, так как мы уже в объекте после копии ...tasks, по этому просто [todolistID]
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(task=>task.id !== action.payload.tId)}
        }
        case 'CHANGE-TASK-TITLE': {
            // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(task=>task.id === action.payload.taskId ?
                    {...task, title: action.payload.newValue} : task)}
        }
        case 'CHANGE-STATUS-TASK': {
            // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(task=>task.id === action.payload.taskId ?
                    {...task, isDone: action.payload.isDone} : task)}
        }
        case 'DELL-TASK-TODO': {
            //Сокращенный вариант ================================================
            // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== tId)})
            //tasks[todolistID] не надо, так как мы уже в объекте после копии ...tasks, по этому просто [todolistID]
            delete state[action.payload.todolistID];
            return state;
        }

        default:
            return state

    }
};

type complexACType = AddTaskACType | AddTaskTodoACType | DeleteTaskACType | ChangeTaskTitleACType | ChangeStatusACACType | DeleteTaskTodoACType;


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

type AddTaskTodoACType = ReturnType<typeof addTaskTodoAC>
export const addTaskTodoAC = (todolistID: string) => {
    return {
        type: 'ADD-TASK-TODO',
        payload: {
            todolistID,
        }
    } as const;
}

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

type DeleteTaskTodoACType = ReturnType<typeof deleteTaskTodoAC>
export const deleteTaskTodoAC = (todolistID: string) => {
    return {
        type: 'DELL-TASK-TODO',
        payload: {
            todolistID,
        }
    } as const;
}

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
export const changeStatusAC = (taskId: string, isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {
            taskId,
            isDone,
            todolistID,
        }
    } as const;
}