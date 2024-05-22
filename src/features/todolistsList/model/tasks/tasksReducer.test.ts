import {
  ADD_TASKS,
  addTasksSaga,
  getTasksSaga,
  SET_TASKS,
  taskActions,
  TaskStateType,
} from "features/todolistsList/model/tasks/tasksReducer";
import { BaseResponsTodolistsType, ResultCode, TaskStatuses, TodoTaskPriorities } from "common/api/todolistsApi";
import { call, put } from "redux-saga/effects";
import { appAction } from "app/model/appReducer";
import { AxiosResponse } from "axios";
import { GetTaskType, tasksApi, TaskType } from "features/todolistsList/api/tasksApi";

let tasks: TaskStateType;
let meResponseError: AxiosResponse<GetTaskType>;
let meResponseData: AxiosResponse<BaseResponsTodolistsType<{ item: TaskType }>>;
beforeEach(() => {
  tasks = {
    todolistID_1: [
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
    todolistID_2: [
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

  meResponseError = {
    data: {
      error: "",
      totalCount: 1,
      items: tasks["todolistID_1"],
    },
  } as AxiosResponse<GetTaskType>;

  meResponseData = {
    data: {
      data: {},
      resultCode: ResultCode.Ok,
    },
  } as AxiosResponse<BaseResponsTodolistsType<{ item: TaskType }>>;
});

test("get tasks saga", () => {
  const todoId = "1";
  const gen = getTasksSaga({ type: SET_TASKS, payload: { tasks: tasks["todolistID_1"], todoId: todoId } });

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(gen.next().value).toEqual(call(tasksApi.getTasks, todoId));

  const res = meResponseError;
  expect(gen.next(res).value).toEqual(put(taskActions.setTasksAction({ tasks: res.data.items, todoId: todoId })));

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "succeeded" })));

  expect(gen.next().done).toBeTruthy();
});

test("add task saga", () => {
  const task = { todoId: "1", title: "hi" };
  const gen = addTasksSaga({ type: ADD_TASKS, payload: task });
  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(gen.next().value).toEqual(call(tasksApi.createTask, task));

  expect(gen.next(meResponseData).value).toEqual(
    put(taskActions.addTasksAction({ task: meResponseData.data.data.item }))
  );

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "succeeded" })));
});

test("add task saga error", () => {
  const task = { todoId: "1", title: "hi" };
  const gen = addTasksSaga({ type: ADD_TASKS, payload: task });
  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(gen.next().value).toEqual(call(tasksApi.createTask, task));

  expect(gen.throw('some error').value).toEqual(put(appAction.setError({ error:  "\"some error\"" })));

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "failed" })));
});



// test("add todolist and null tasks", () => {
//   const newTasks = tasksReducer(tasks, {
//     type: todoThunk.addTodo.fulfilled.type,
//     payload: {
//       todolist: {
//         id: "todolistID",
//         title: "new todolistsList",
//         order: 0,
//         addedDate: ""
//       }
//     }
//   });
//   const keys = Object.keys(newTasks); //Метод обьекта, мы передаем ему наш массив и он возвращает массив в виде строк всех ключей
//   //Находим новый ключ
//   const newKey = keys.find((k) => k !== "todolistID_1" && k !== "todolistID_2");
//   if (!newKey) {
//     //Если не нашелся то генерируем ошибку
//     throw Error("Бляяяяя!");
//   }
//   expect(keys.length).toBe(3);
//   expect(newTasks[newKey]).toEqual([]);
//   expect(newTasks["todolistID"].length).toBe(0);
//   expect(newTasks["todolistID"]).toBeDefined();
// });

// test("remove task", () => {
//   const newTasks = tasksReducer(
//     tasks,
//     {
//       type: tasksThunk.deleteTasksTC.fulfilled.type,
//       payload: {
//         todoId: "todolistID_1", taskId: "1"
//       }
//     }
//   );
//
//   // const newTasks = tasksReducer(tasks, taskActions.deleteTask({ todolistID: "todolistID_1", taskId: "1" }));
//
//   expect(newTasks["todolistID_1"].length).toBe(3);
//   expect(newTasks["todolistID_2"].length).toBe(4);
//   expect(tasks["todolistID_1"].length).toBe(4);
//   expect(newTasks["todolistID_1"].every((t) => t.id !== "1")).toBeTruthy();
//   // expect(newTasks).toEqual({//tasks переменная в которой лежат данные, в данном случаи обьекты
//   //     ['todolistID_1']: [
//   //         {id: '2', title: "JS", status: TaskStatuses.Completed},
//   //         {id: '3', title: "ReactJS", status: TaskStatuses.Completed},
//   //         {id: '4', title: "Next", status: TaskStatuses.New},
//   //     ],
//   //     ['todolistID_2']: [
//   //         {id: '1', title: "Beer", status: TaskStatuses.Completed},
//   //         {id: '2', title: "Meat", status: TaskStatuses.Completed},
//   //         {id: '3', title: "Fish", status: TaskStatuses.Completed},
//   //         {id: '4', title: "Drink", status: TaskStatuses.New},
//   //     ],
//   // })
// });

// test("change task title", () => {
//   const updTask = {
//     todoId: "todolistID_1",
//     taskId: "1",
//     model: {
//       title: "hi"
//     }
//   };
//   const newTasks = tasksReducer(tasks, taskActions.updateTaskTC.fulfilled(updTask, "", updTask));
//   // taskActions.updTask({
//   //   todolistID: "todolistID_1",
//   //   taskId: "1",
//   //   model: {
//   //     title: "hi",
//   //   },
//   // })
//
//   expect(newTasks["todolistID_1"][1].title).toBe("JS");
//   expect(tasks["todolistID_1"][1].title).toBe("JS");
// });

// test("change task status", () => {
//   const updTask = {
//     todoId: "todolistID_1",
//     taskId: "2",
//     model: {
//       status: TaskStatuses.New
//     }
//   };
//
//   const newTasks = tasksReducer(
//     tasks,
//     taskActions.updateTaskTC.fulfilled(updTask, "", updTask)
//     // taskActions.updTask({
//     //     todolistID: "todolistID_1",
//     //     taskId: "2",
//     //     model: {
//     //       status: TaskStatuses.New,
//     //     },
//     //   })
//   );
//
//   expect(newTasks["todolistID_1"][1].status).toBe(TaskStatuses.New);
//   expect(tasks["todolistID_1"][1].status).toBe(TaskStatuses.Completed);
// });

// test("пустые массивы должны быть добавлены, когда мы set todolists", () => {
//   const newTasks = tasksReducer(
//     {},
//     {
//       type: todoThunk.setTodolistAction.fulfilled.type,
//       payload: {
//         todolist: [
//           { id: "1", title: "title1", order: 0, addedDate: "" },
//           { id: "2", title: "title2", order: 0, addedDate: "" }
//         ]
//       }
//     }
//   );
//
//   const keys = Object.keys(newTasks);
//
//   expect(keys.length).toBe(2);
//   expect(newTasks["1"]).toStrictEqual([]);
//   expect(newTasks["2"]).toStrictEqual([]);
// });

// test("tasks для todolistsList должны быть добавлены", () => {
//   const newTasks = tasksReducer(
//     {
//       todolistID_2: [],
//       todolistID_1: []
//     },
//     // taskActions.setTasks({
//     //   todolistID: "todolistID_1",
//     //   tasks: tasks["todolistID_1"],
//     // })
//
//     tasksThunk.setTasksTC.fulfilled(
//       {
//         todoId: "todolistID_1",
//         tasks: tasks["todolistID_1"]
//       },
//       "",
//       "todolistID_1"
//     )
//   );
//
//   expect(newTasks["todolistID_1"].length).toBe(4);
//   expect(newTasks["todolistID_2"].length).toBe(0);
// });
