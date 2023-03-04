import {addTodolistAC, deleteTodolistAC, TodoAppApiType, todoListsReducer} from "./todoListsReducer";
import {tasksReducer, taskStateType} from "./tasksReducer";
import {TaskStatuses, TodoTaskPriorities} from "../api/todolistsApi";



test('ids should be equals', () => {
    const todoLists: TodoAppApiType[] = [];
    const tasks: taskStateType = {};

    // const action = addTaskTodoAC('new todolist');

    const newTodoLists = todoListsReducer(todoLists, addTodolistAC('title', 'todolistID'))
    const newTasks = tasksReducer(tasks, addTodolistAC('title', 'todolistID'));

    const keys = Object.keys(newTasks);
    const idFromTodoLists = newTodoLists[0].id;
    const idFromTasks = keys[0];

    expect(idFromTodoLists).toBe('todolistID');
    expect(idFromTasks).toBe('todolistID');
})

test('delete todolist and task', () => {
    const tasks: taskStateType = {//tasks переменная в которой лежат данные, в данном случаи обьекты
        ['todolistID_1']: [
            {
                id: '1',
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                todoListId: 'todolistID_1',
                description: ''
            },
            {
                id: '2', title: "JS", status: TaskStatuses.Completed,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                todoListId: 'todolistID_1',
                description: ''
            },
            {
                id: '3', title: "ReactJS", status: TaskStatuses.Completed,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                todoListId: 'todolistID_1',
                description: ''

            },
            {
                id: '4', title: "Next", status: TaskStatuses.New,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                todoListId: 'todolistID_1',
                description: ''
            },
        ],
        ['todolistID_2']: [
            {
                id: '1', title: "Beer", status: TaskStatuses.Completed,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                todoListId: 'todolistID_2',
                description: ''
            },
            {
                id: '2', title: "Meat", status: TaskStatuses.Completed,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                todoListId: 'todolistID_2',
                description: ''
            },
            {
                id: '3', title: "Fish", status: TaskStatuses.Completed,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                todoListId: 'todolistID_2',
                description: ''
            },
            {
                id: '4', title: "Drink", status: TaskStatuses.New,
                addedDate: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                todoListId: 'todolistID_2',
                description: ''
            },
        ],
    }


    const newTask = tasksReducer(tasks, deleteTodolistAC('todolistID_1'));
    const keys = Object.keys(newTask)

    expect(keys.length).toBe(1);
    expect(newTask['todolistID_1']).not.toBeDefined();
})

