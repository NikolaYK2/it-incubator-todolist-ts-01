import {addTaskAC, changeStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./tasksReducer";
import {v1} from "uuid";
import {taskStateType} from "../App";
import {addTodolistAC} from "./todoListsReducer";

test('add task', () => {
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const addTitle = 'hi';


    const tasks: taskStateType = {//tasks переменная в которой лежат данные, в данном случаи обьекты
        [todolistID_1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: true},
            {id: '4', title: "Next", isDone: false},
        ],
        [todolistID_2]: [
            {id: '1', title: "Beer", isDone: true},
            {id: '2', title: "Meat", isDone: true},
            {id: '3', title: "Fish", isDone: true},
            {id: '4', title: "Drink", isDone: false},
        ],
    }

    const newTasks = tasksReducer(tasks, addTaskAC(addTitle, todolistID_2));

    expect(newTasks[todolistID_2].length).toBe(5);
    expect(newTasks[todolistID_2][0].title).toBe('hi');
    expect(newTasks[todolistID_2][0].id).toBeDefined();
    expect(newTasks[todolistID_2][0].isDone).toBe(false);
})

test('add todolist and null tasks', () => {
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const todolistID = v1();


    const tasks: taskStateType = {//tasks переменная в которой лежат данные, в данном случаи обьекты
        [todolistID_1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: true},
            {id: '4', title: "Next", isDone: false},
        ],
        [todolistID_2]: [
            {id: '1', title: "Beer", isDone: true},
            {id: '2', title: "Meat", isDone: true},
            {id: '3', title: "Fish", isDone: true},
            {id: '4', title: "Drink", isDone: false},
        ],
    }
    const title = 'Hi';
    const newTasks = tasksReducer(tasks, addTodolistAC(title, todolistID));
    const keys = Object.keys(newTasks);//Метод обьекта, мы передаем ему наш массив и он возвращает массив в виде строк всех ключей
    //Находим новый ключ
    const newKey = keys.find(k => k != todolistID_1 && k != todolistID_2);
    if (!newKey) {//Если не нашелся то генерируем ошибку
        throw Error('Бляяяяя!')
    }
    expect(keys.length).toBe(3);
    expect(newTasks[newKey]).toEqual([]);
    expect(newTasks[todolistID].length).toBe(0);
    expect(newTasks[todolistID]).toBeDefined();
})

test('remove task', () => {
    const todolistID_1 = v1();
    const todolistID_2 = v1();


    const tasks: taskStateType = {//tasks переменная в которой лежат данные, в данном случаи обьекты
        [todolistID_1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: true},
            {id: '4', title: "Next", isDone: false},
        ],
        [todolistID_2]: [
            {id: '1', title: "Beer", isDone: true},
            {id: '2', title: "Meat", isDone: true},
            {id: '3', title: "Fish", isDone: true},
            {id: '4', title: "Drink", isDone: false},
        ],
    }

    const newTasks = tasksReducer(tasks, deleteTaskAC(todolistID_1, '1'));

    expect(newTasks[todolistID_1].length).toBe(3);
    expect(newTasks[todolistID_2].length).toBe(4);
    expect(tasks[todolistID_1].length).toBe(4);
    expect(newTasks[todolistID_1].every(t => t.id != '1')).toBeTruthy();
    expect(newTasks).toEqual({//tasks переменная в которой лежат данные, в данном случаи обьекты
        [todolistID_1]: [
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: true},
            {id: '4', title: "Next", isDone: false},
        ],
        [todolistID_2]: [
            {id: '1', title: "Beer", isDone: true},
            {id: '2', title: "Meat", isDone: true},
            {id: '3', title: "Fish", isDone: true},
            {id: '4', title: "Drink", isDone: false},
        ],
    })
})

test('change task title', () => {
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const newValue = 'hi';

    const tasks: taskStateType = {//tasks переменная в которой лежат данные, в данном случаи обьекты
        [todolistID_1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: true},
            {id: '4', title: "Next", isDone: false},
        ],
        [todolistID_2]: [
            {id: '1', title: "Beer", isDone: true},
            {id: '2', title: "Meat", isDone: true},
            {id: '3', title: "Fish", isDone: true},
            {id: '4', title: "Drink", isDone: false},
        ],
    }

    const newTasks = tasksReducer(tasks, changeTaskTitleAC('2', newValue, todolistID_1));

    expect(newTasks[todolistID_1][1].title).toBe('hi');
    expect(tasks[todolistID_1][1].title).toBe("JS");
})

test('change task status', () => {
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const isDone = false;

    const tasks: taskStateType = {//tasks переменная в которой лежат данные, в данном случаи обьекты
        [todolistID_1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: true},
            {id: '4', title: "Next", isDone: false},
        ],
        [todolistID_2]: [
            {id: '1', title: "Beer", isDone: true},
            {id: '2', title: "Meat", isDone: true},
            {id: '3', title: "Fish", isDone: true},
            {id: '4', title: "Drink", isDone: false},
        ],
    }

    const newTasks = tasksReducer(tasks, changeStatusAC('2', isDone, todolistID_1));

    expect(newTasks[todolistID_1][1].isDone).toBe(false);
    expect(tasks[todolistID_1][1].isDone).toBe(true);
})
