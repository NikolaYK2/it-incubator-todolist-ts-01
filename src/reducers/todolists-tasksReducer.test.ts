import {taskStateType, TodolistType} from "../App";
import {addTodolistAC, deleteTodolistAC, todoListsReducer} from "./todoListsReducer";
import {tasksReducer} from "./tasksReducer";
import {v1} from "uuid";

test('ids should be equals', () => {
    const todoLists: TodolistType[] = [];
    const tasks: taskStateType = {};

    // const action = addTaskTodoAC('new todolist');
    const title = 'new title';
    const todolistID = v1();

    const newTodoLists = todoListsReducer(todoLists,addTodolistAC(title, todolistID))
    const newTasks = tasksReducer(tasks,addTodolistAC(title, todolistID));

    const keys = Object.keys(newTasks);
    const idFromTodoLists = newTodoLists[0].id;
    const idFromTasks = keys[0];

    expect(idFromTodoLists).toBe(todolistID);
    expect(idFromTasks).toBe(todolistID);
})

test('delete todolist and task', () => {
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const tasks: taskStateType = {//tasks переменная в которой лежат данные, в данном случаи обьекты
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "Next", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Drink", isDone: false},
        ],
    }

    const newTask = tasksReducer(tasks, deleteTodolistAC(todolistID_1));
    const keys = Object.keys(newTask)

    expect(keys.length).toBe(1);
    expect(newTask[todolistID_1]).not.toBeDefined();
})
