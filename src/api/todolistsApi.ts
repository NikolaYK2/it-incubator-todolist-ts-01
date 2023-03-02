import axios from "axios";

// const settings = {
//     withCredentials: true,
//     // headers:{
//     //     'API-KEY': сюда свой ключ
//     // }
// }
const instance = axios.create({
    withCredentials: true,
    // headers:{
    //     'API-KEY': '0317dbf2-f26f-44a4-a811-d77a69628a1e'
    // },
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
})
// ========= todolistss typeee =================================
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

type ResponsTodolistsType<D = {}> = {//D - уточняем наш дженерик D-типо data/ D = {} - если дженерик не передовать, он по умолчанию может являться пустым обьектом
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

//tasks type==============================================
export type UpdTaskType={
    title: string,
    description: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
}
export type TaskType = {
    title: string,
    description: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
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
        return instance.get<Array<TodolistType>>(`todo-lists/`)/*.then((res) => res.data)*/; //Лишняя строчка кода считаю

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
    createTask(todoId:string, title: string) {//Мы будем хотеть поменять tittle, по этому нужен параметр
        return instance.post<ResponsTodolistsType>(`todo-lists/${todoId}/tasks`, {title});
    },
    deleteTask(todoId: string, taskId:string) {
        return instance.delete<ResponsTodolistsType>(`todo-lists/${todoId}/tasks/${taskId}`);
    },
    updateTask(todoId: string, taskId:string, title: UpdTaskType) {
        return instance.put<UpdTaskType>(`todo-lists/${todoId}/tasks/${taskId}`, {title});
    },
}