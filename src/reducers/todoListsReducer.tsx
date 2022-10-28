import {filterValueType, TodolistType} from "../App";


export const todoListsReducer = (state: TodolistType[], action: complexTypeActions) => {

    if (action.type === 'ADD-TODO') {
        // let todolist: TodolistType = {id: v1(), title: action.payload.title, filter: 'All'};
        // setTodoLists([todolist, ...todoLists])
        // setTasks({...tasks, [todolist.id]: []})
        return [...state, {id: action.payload.todolistID, title: action.payload.title, filter: 'All'}] as TodolistType[];
    } else if (action.type === 'DELETE-TODO') {
        // setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
        // delete tasks[todolistID];// И нужно еще удалить объект с тасками, что бы мусора не было
        return state.filter(todo => todo.id !== action.payload.todolistID)
    } else if (action.type === 'CHANGE-TITLE-TODO') {
        // setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, title: newValue} : tl));
        return state.map(todo => todo.id === action.payload.todoId ? {...todo, title: action.payload.newValue} : todo);
    } else if (action.type === 'TASK-FILTER-TODO') {
        //     setFilterValue(filterValue);
        // setTodoLists(todoLists.map(tl => tl.id === todoListsID ? {...tl, filter} : tl))
        //map создает новый массив так что копию(...todolist) делать не надо
        return state.map(todoFil => todoFil.id === action.payload.todoListsID ? {...todoFil, filter: action.payload.filter} : todoFil);
    }
    return state;
};


export type complexTypeActions =
    AddTodolistACType |
    DeleteTodolistACType |
    OnChangeHandlerTitleTodolistACType |
    ChangeTasksFilterACType;


type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, todolistID:string) => {
    return {
        type: 'ADD-TODO',
        payload: {
            title,
            todolistID,
        }
    } as const;

}

type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todolistID: string) => {
    return {
        type: 'DELETE-TODO',
        payload: {
            todolistID,
        }
    } as const;
}

type OnChangeHandlerTitleTodolistACType = ReturnType<typeof onChangeHandlerTitleTodolistAC>
export const onChangeHandlerTitleTodolistAC = (todoId: string, newValue: string,) => {
    return {
        type: 'CHANGE-TITLE-TODO',
        payload: {
            todoId,
            newValue,
        }
    } as const;
}

type ChangeTasksFilterACType = ReturnType<typeof changeTasksFilterAC>
export const changeTasksFilterAC = (todoListsID: string, filter: filterValueType,) => {
    return {
        type: 'TASK-FILTER-TODO',
        payload: {
            todoListsID,
            filter,
        }
    } as const;
}