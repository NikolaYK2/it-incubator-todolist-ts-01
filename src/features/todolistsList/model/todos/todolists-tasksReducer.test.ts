import { todoActions } from "features/todolistsList/model/todos/todoListsReducer";
import { tasksReducer, TaskStateType } from "features/todolistsList/model/tasks/tasksReducer";
import { TaskStatuses, TodoTaskPriorities } from "common/api/todolistsApi";

// test("ids should be equals", () => {
//   const todoLists: TodoAppType[] = [];
//   const tasks: TaskStateType = {};
//
//   // const action = addTaskTodoAC('new todolist');
//
//   const newTodoLists = todoListsReducer(todoLists, {
//     type: todoThunk.addTodo.fulfilled.type,
//     payload: {
//       todolist: {
//         id: "todolistID",
//         title: "What to learn",
//         order: 0,
//         addedDate: "",
//       },
//     },
//   });
//   const newTasks = tasksReducer(tasks, {
//     type: todoThunk.addTodo.fulfilled.type,
//     payload: {
//       todolist: {
//         id: "todolistID",
//         title: "What to learn",
//         order: 0,
//         addedDate: "",
//       },
//     },
//   });
//
//   const keys = Object.keys(newTasks);
//   const idFromTodoLists = newTodoLists[0].id;
//   const idFromTasks = keys[0];
//
//   expect(idFromTodoLists).toBe("todolistID");
//   expect(idFromTasks).toBe("todolistID");
// });

test("delete todolist and task", () => {
  const tasks: TaskStateType = {
    //tasks переменная в которой лежат данные, в данном случаи обьекты
    "todolistID_1": [
      {
        id: "1",
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_1",
        description: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_1",
        description: "",
      },
      {
        id: "3",
        title: "ReactJS",
        status: TaskStatuses.Completed,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_1",
        description: "",
      },
      {
        id: "4",
        title: "Next",
        status: TaskStatuses.New,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_1",
        description: "",
      },
    ],
    "todolistID_2": [
      {
        id: "1",
        title: "Beer",
        status: TaskStatuses.Completed,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_2",
        description: "",
      },
      {
        id: "2",
        title: "Meat",
        status: TaskStatuses.Completed,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_2",
        description: "",
      },
      {
        id: "3",
        title: "Fish",
        status: TaskStatuses.Completed,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_2",
        description: "",
      },
      {
        id: "4",
        title: "Drink",
        status: TaskStatuses.New,
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: "todolistID_2",
        description: "",
      },
    ],
  };

  const newTask = tasksReducer(tasks, {
    type: todoActions.deleteTodoAction.type,
    payload: {
      todolistID: "todolistID_1",
    },
  });

  const keys = Object.keys(newTask);

  expect(keys.length).toBe(1);
  expect(newTask["todolistID_1"]).not.toBeDefined();
});

// test("set todolistsList and task", () => {
//   const todoLists: TodoAppType[] = [];
//   const tasks: TaskStateType = {};
//
//   let todolist: TodolistType = {
//     id: "todolistID_1",
//     title: "What to learn",
//     order: 0,
//     addedDate: "",
//   };
//
//   const newTodoLists = todoListsReducer(todoLists, {
//     type: todoThunk.addTodo.fulfilled.type,
//     payload: { todolist: todolist },
//   });
//   const newTasks = tasksReducer(tasks, {
//     type: todoThunk.addTodo.fulfilled.type,
//     payload: { todolist: todolist },
//   });
//
//   const keys = Object.keys(newTasks);
//   const idFromTodoLists = newTodoLists[0].id;
//   const idFromTasks = keys[0];
//
//   expect(idFromTodoLists).toBe(todolist.id);
//   expect(idFromTasks).toBe(todolist.id);
// });
