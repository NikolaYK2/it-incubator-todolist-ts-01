import axios from "axios";
import {EntStatusType} from "../features/todolistsList/tasksReducer";

const instance = axios.create({
    withCredentials: true,
    // headers:{
    //     'API-KEY': '0317dbf2-f26f-44a4-a811-d77a69628a1e'
    // },
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
})


//TODOL typeee =================================
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}

// type CreateTodolistType= {// Тоже похожий тип, отличие только с обьектом, тут полный в ниже пустой, для этого нужно создать дженерик
//     resultCode: number
//     messages: string[],
//     data: {
//         item: TodolistType,
//     },
// }

export type ResponsTodolistsType<D = {}> = {//D - уточняем наш дженерик D-типо data/ D = {} - если дженерик не передовать, он по умолчанию может являться пустым обьектом
    resultCode: number
    messages: string[],
    data: D,
}

// type DeleteUpdateTodolistsType= {//Убираем дублирование кода
//     resultCode: number
//     messages: string[],
//     data: {},
// }
// type UpdateTodolistsType= {//Убираем дублирование кода
//     resultCode: number
//     messages: string[],
//     data: {},
// }

//TASK type==============================================
export enum TaskStatuses {//Тип данных. Перечисление всех возможных вариантов
    New = 0,//Где isDOne false = New
    InProgress = 1,
    Completed = 2,//выполнено,типо isDone ture
    Draft = 3
}

export enum TodoTaskPriorities {//Тип данных. Перечисление всех возможных вариантов
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type UpdTaskType = {
    title: string,
    description: string,
    status: TaskStatuses,
    priority: TodoTaskPriorities,
    startDate: string,
    deadline: string,
}
export type TaskType = EntStatusType & {
    id: string,
    title: string,
    description: string,
    // completed: boolean,
    status: TaskStatuses,
    // entityStatus?: StatusType,
    priority: TodoTaskPriorities,
    startDate: string,
    deadline: string,
    todoListId: string,
    order: number,
    addedDate: string,

}
export type GetTaskType = {
    items: TaskType[],
    totalCount: number,
    error: string | null,
}


export const todolistsApi = {
    //TODolis =====================================================================
    getTodolists() {
        //Уточняем что к нам придет массив тудулистов axios.get<Array<TodolistType>>
        // return axios.get<Array<TodolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists/', settings);
        //Типизируя запросы, нужно ссылаться на тот обьект что прихзодит в response
        return instance.get<Array<TodolistType>>(`todo-lists/`);
    },
    createTodolists(title: string) {//Мы будем хотеть поменять tittle, по этому нужен параметр
        return instance.post<ResponsTodolistsType<{ item: TodolistType }>>('todo-lists/', {title: title});
    },
    deleteTodolists(todoId: string) {
        return instance.delete<ResponsTodolistsType<{}>>(`todo-lists/${todoId}`);
    },
    updateTodolists(todoId: string, title: string) {
        return instance.put<ResponsTodolistsType>(`todo-lists/${todoId}`, {title});
    },

    //TASK================================================
    getTasks(todoId: string) {
        return instance.get<GetTaskType>(`todo-lists/${todoId}/tasks`);
    },
    createTask(todoId: string, title: string) {//Мы будем хотеть поменять tittle, по этому нужен параметр
        return instance.post<ResponsTodolistsType<{ item: TaskType }>>(`todo-lists/${todoId}/tasks`, {title});
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<ResponsTodolistsType>(`todo-lists/${todoId}/tasks/${taskId}`);
    },
    updateTask(todoId: string, taskId: string, data: UpdTaskType) {
        return instance.put<ResponsTodolistsType<{ item: TaskType }>>(`todo-lists/${todoId}/tasks/${taskId}`, data);
    },
}


export type AuthLoginType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}
type AuthMeType={
    id: number,
    email: string,
    login: string,
}
export const authApi = {
    auth(/*email: string, password: string, rememberMe: boolean*/ data: AuthLoginType) {
        return instance.post<ResponsTodolistsType<{userId?:number}>>('auth/login', data);
    },
    me() {
        return instance.get<ResponsTodolistsType<AuthMeType>>('auth/me');
    },
    logout() {
        return instance.delete<ResponsTodolistsType>('auth/login');
    }
}