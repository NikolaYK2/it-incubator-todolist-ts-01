import {
  ADD_TASKS,
  addTasksSaga,
  deleteTasksSaga,
  getTasksSaga,
  REMOVE_TASKS,
  SET_TASKS,
  taskActions,
  TaskStateType,
  UPD_TASK,
  updateTaskSaga,
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

  expect(gen.throw("some error").value).toEqual(put(appAction.setError({ error: '"some error"' })));

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "failed" })));
});

test("delete task saga", () => {
  const task = { todoId: "1", taskId: "1" };
  const gen = deleteTasksSaga({ type: REMOVE_TASKS, payload: task });
  expect(gen.next().value).toEqual(
    put(
      taskActions.changeEntStatusTask({
        taskId: task.taskId,
        todoId: task.todoId,
        status: "loading",
      })
    )
  );
  const res = {
    data: {
      data: tasks,
      resultCode: 0,
    },
  } as AxiosResponse<BaseResponsTodolistsType>;

  expect(gen.next().value).toEqual(call(tasksApi.deleteTask, task.todoId, task.taskId));

  expect(gen.next(res).value).toEqual(
    put(
      taskActions.changeEntStatusTask({
        taskId: task.taskId,
        todoId: task.todoId,
        status: "idle",
      })
    )
  );

  expect(gen.next().value).toEqual(put(taskActions.deleteTasksSuccess({ todoId: task.todoId, taskId: task.taskId })));
});

test("delete task saga un error", () => {
  const task = { todoId: "1", taskId: "1" };
  const gen = deleteTasksSaga({ type: REMOVE_TASKS, payload: task });
  expect(gen.next().value).toEqual(
    put(
      taskActions.changeEntStatusTask({
        taskId: task.taskId,
        todoId: task.todoId,
        status: "loading",
      })
    )
  );
  expect(gen.next().value).toEqual(call(tasksApi.deleteTask, task.todoId, task.taskId));

  meResponseData.data.resultCode = 1;
  expect(gen.next(meResponseData).value).toEqual(undefined);
});

test("upd task saga", () => {
  const task = { payload: { todoId: "todolistID_1", taskId: "1", model: tasks } };
  const gen = updateTaskSaga({ type: UPD_TASK, payload: task.payload });

  // expect(gen.next().value).toEqual(
  //   select((state) => state.tasks[task.payload.todoId].find((t: TaskType) => t.id === task.payload.taskId))
  // );
  // Проверяем следующий вызов, который должен сделать put
  // // expect(gen.next().value).toEqual(
  // //   put(
  // //     taskActions.changeEntStatusTask({
  // //       todoId: task.payload.todoId,
  // //       taskId: task.payload.taskId,
  // //       status: "loading",
  // //     })
  // //   )
  // );

  // Продолжайте тестирование вашей саги...
  // expect(gen.next().value).toEqual(call(tasksApi.updateTask, task, selectEfect));
});
