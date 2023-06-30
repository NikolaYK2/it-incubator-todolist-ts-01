import { TaskStatuses, TodoTaskPriorities } from "api/todolistsApi";
import { todoActions } from "features/todolistsList/todoListsReducer";
import { tasksReducer, TaskStateType, tasksThunk } from "features/todolistsList/tasksReducer";

let tasks: TaskStateType;
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
});

test("add task", () => {
  // const tasks: taskStateType = {//tasks переменная в которой лежат данные, в данном случаи обьекты
  //     [todolistID_1]: [
  //         {id: '1', title: "HTML&CSS", isDone: true},
  //         {id: '2', title: "JS", isDone: true},
  //         {id: '3', title: "ReactJS", isDone: true},
  //         {id: '4', title: "Next", isDone: false},
  //     ],
  //     [todolistID_2]: [
  //         {id: '1', title: "Beer", isDone: true},
  //         {id: '2', title: "Meat", isDone: true},
  //         {id: '3', title: "Fish", isDone: true},
  //         {id: '4', title: "Drink", isDone: false},
  //     ],
  // }

  const newTasks = tasksReducer(
    tasks,
    tasksThunk.addTasksTC.fulfilled(
      {
        task: {
          id: "3",
          title: "He",
          status: TaskStatuses.New,
          addedDate: "",
          startDate: "",
          deadline: "",
          order: 0,
          priority: TodoTaskPriorities.Low,
          todoListId: "todolistID_2",
          description: "",
        },
      },
      "",
      { todoId: "todolistID_2", title: "He" }
    )
    // taskActions.addTask({
    //   task: {
    //     id: "3",
    //     title: "He",
    //     status: TaskStatuses.New,
    //     addedDate: "",
    //     startDate: "",
    //     deadline: "",
    //     order: 0,
    //     priority: TodoTaskPriorities.Low,
    //     todoListId: "todolistID_2",
    //     description: "",
    //   },
    // })
  );

  expect(newTasks["todolistID_2"].length).toBe(5);
  expect(newTasks["todolistID_2"][0].title).toBe("He");
  expect(newTasks["todolistID_2"][0].id).toBeDefined();
  expect(newTasks["todolistID_2"][0].status).toBe(TaskStatuses.New);
});

test("add todolist and null tasks", () => {
  const newTasks = tasksReducer(
    tasks,
    todoActions.addTodo({
      todolist: {
        id: "todolistID",
        title: "new todolistsList",
        order: 0,
        addedDate: "",
      },
    })
  );
  const keys = Object.keys(newTasks); //Метод обьекта, мы передаем ему наш массив и он возвращает массив в виде строк всех ключей
  //Находим новый ключ
  const newKey = keys.find((k) => k !== "todolistID_1" && k !== "todolistID_2");
  if (!newKey) {
    //Если не нашелся то генерируем ошибку
    throw Error("Бляяяяя!");
  }
  expect(keys.length).toBe(3);
  expect(newTasks[newKey]).toEqual([]);
  expect(newTasks["todolistID"].length).toBe(0);
  expect(newTasks["todolistID"]).toBeDefined();
});

test("remove task", () => {
  const newTasks = tasksReducer(
    tasks,
    tasksThunk.deleteTasksTC.fulfilled(
      { todoId: "todolistID_1", taskId: "1" },
      "",
      { todoId: "todolistID_1", taskId: "1" },
      "todolistID_1"
    )
  );
  // const newTasks = tasksReducer(tasks, taskActions.deleteTask({ todolistID: "todolistID_1", taskId: "1" }));

  expect(newTasks["todolistID_1"].length).toBe(3);
  expect(newTasks["todolistID_2"].length).toBe(4);
  expect(tasks["todolistID_1"].length).toBe(4);
  expect(newTasks["todolistID_1"].every((t) => t.id !== "1")).toBeTruthy();
  // expect(newTasks).toEqual({//tasks переменная в которой лежат данные, в данном случаи обьекты
  //     ['todolistID_1']: [
  //         {id: '2', title: "JS", status: TaskStatuses.Completed},
  //         {id: '3', title: "ReactJS", status: TaskStatuses.Completed},
  //         {id: '4', title: "Next", status: TaskStatuses.New},
  //     ],
  //     ['todolistID_2']: [
  //         {id: '1', title: "Beer", status: TaskStatuses.Completed},
  //         {id: '2', title: "Meat", status: TaskStatuses.Completed},
  //         {id: '3', title: "Fish", status: TaskStatuses.Completed},
  //         {id: '4', title: "Drink", status: TaskStatuses.New},
  //     ],
  // })
});

test("change task title", () => {
  const updTask = {
    todoId: "todolistID_1",
    taskId: "1",
    model: {
      title: "hi",
    },
  };
  const newTasks = tasksReducer(tasks, tasksThunk.updateTaskTC.fulfilled(updTask, "", updTask));
  // taskActions.updTask({
  //   todolistID: "todolistID_1",
  //   taskId: "1",
  //   model: {
  //     title: "hi",
  //   },
  // })

  expect(newTasks["todolistID_1"][1].title).toBe("JS");
  expect(tasks["todolistID_1"][1].title).toBe("JS");
});

test("change task status", () => {
  const updTask = {
    todoId: "todolistID_1",
    taskId: "2",
    model: {
      status: TaskStatuses.New,
    },
  };

  const newTasks = tasksReducer(
    tasks,
    tasksThunk.updateTaskTC.fulfilled(updTask, "", updTask)
    // taskActions.updTask({
    //     todolistID: "todolistID_1",
    //     taskId: "2",
    //     model: {
    //       status: TaskStatuses.New,
    //     },
    //   })
  );

  expect(newTasks["todolistID_1"][1].status).toBe(TaskStatuses.New);
  expect(tasks["todolistID_1"][1].status).toBe(TaskStatuses.Completed);
});

test("пустые массивы должны быть добавлены, когда мы set todolists", () => {
  const newTasks = tasksReducer(
    {},
    todoActions.setTodo({
      todolist: [
        { id: "1", title: "title1", order: 0, addedDate: "" },
        { id: "2", title: "title2", order: 0, addedDate: "" },
      ],
    })
  );

  const keys = Object.keys(newTasks);

  expect(keys.length).toBe(2);
  expect(newTasks["1"]).toStrictEqual([]);
  expect(newTasks["2"]).toStrictEqual([]);
});

test("tasks для todolistsList должны быть добавлены", () => {
  const newTasks = tasksReducer(
    {
      todolistID_2: [],
      todolistID_1: [],
    },
    // taskActions.setTasks({
    //   todolistID: "todolistID_1",
    //   tasks: tasks["todolistID_1"],
    // })

    tasksThunk.setTasksTC.fulfilled(
      {
        todoId: "todolistID_1",
        tasks: tasks["todolistID_1"],
      },
      "",
      "todolistID_1"
    )
  );

  expect(newTasks["todolistID_1"].length).toBe(4);
  expect(newTasks["todolistID_2"].length).toBe(0);
});
