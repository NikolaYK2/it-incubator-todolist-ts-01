import {
  addTodoSaga,
  changeTitleTodoSaga,
  CREATE_TITLE_TODO,
  CREATE_TODO,
  DELETE_TODO_ID,
  deleteTodoSaga,
  todoActions,
  TodoAppType,
  todoListsReducer,
} from "features/todolistsList/model/todos/todoListsReducer";
import { call, put } from "redux-saga/effects";
import { appAction } from "app/model/appReducer";
import { todolistsApi, TodolistType } from "features/todolistsList/api/todolistsApi";
import { AxiosResponse } from "axios";
import { BaseResponsTodolistsType } from "common/api/todolistsApi";

let todoLists: TodoAppType[];
let meResponse: AxiosResponse<BaseResponsTodolistsType>;
beforeEach(() => {
  todoLists = [
    {
      id: "todolistID_1",
      title: "What to learn",
      filter: "All",
      order: 0,
      addedDate: "",
      entityStatus: "idle",
    },
    {
      id: "todolistID_2",
      title: "What to buy",
      filter: "All",
      order: 0,
      addedDate: "",
      entityStatus: "idle",
    },
  ];
  meResponse = {
    data: {
      data: {},
      resultCode: 0,
      messages: ["error"],
    },
  } as AxiosResponse<BaseResponsTodolistsType>;
});

test("add todolist saga", () => {
  const title = "saga";
  const gen = addTodoSaga({ type: CREATE_TODO, payload: title });

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(gen.next().value).toEqual(call(todolistsApi.createTodolists, title));

  const res: AxiosResponse<
    BaseResponsTodolistsType<{
      item: TodolistType;
    }>
  > = meResponse as AxiosResponse<BaseResponsTodolistsType<{ item: TodolistType }>>;

  expect(gen.next(res).value).toEqual(put(todoActions.createTodoAction({ todolist: res.data.data.item })));

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "idle" })));
});

test("add todolist saga error server", () => {
  const title = "saga";
  const gen = addTodoSaga({ type: CREATE_TODO, payload: title });

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(gen.next().value).toEqual(call(todolistsApi.createTodolists, title));

  meResponse.data.resultCode = 1;
  expect(gen.next(meResponse).value).toEqual(put(appAction.setError({ error: meResponse.data.messages[0] })));

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "failed" })));
});

test("add todolist saga error network", () => {
  const title = "saga";
  const gen = addTodoSaga({ type: CREATE_TODO, payload: title });

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(gen.next().value).toEqual(call(todolistsApi.createTodolists, title));
  expect(gen.throw("some error").value).toEqual(put(appAction.setError({ error: '"some error"' })));

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "failed" })));
});

test("delete todolist saga", () => {
  const todoId = "todolistID_1";
  const gen = deleteTodoSaga({ type: DELETE_TODO_ID, payload: todoId });

  expect(gen.next().value).toEqual(put(todoActions.changeEntStatusTodo({ todoId: todoId, status: "loading" })));

  expect(gen.next().value).toEqual(call(todolistsApi.deleteTodolists, todoId));

  expect(gen.next(meResponse).value).toEqual(put(todoActions.deleteTodoAction({ todolistID: todoId })));

  expect(gen.next().value).toEqual(put(todoActions.changeEntStatusTodo({ todoId: todoId, status: "idle" })));
});

test("delete todolist saga error server", () => {
  const todoId = "todolistID_1";
  const gen = deleteTodoSaga({ type: DELETE_TODO_ID, payload: todoId });

  expect(gen.next().value).toEqual(put(todoActions.changeEntStatusTodo({ todoId: todoId, status: "loading" })));

  expect(gen.next().value).toEqual(call(todolistsApi.deleteTodolists, todoId));

  meResponse.data.resultCode = 1;
  expect(gen.next(meResponse).value).toEqual(put(appAction.setError({ error: meResponse.data.messages[0] })));

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "failed" })));
});

test("delete todolist saga error network", () => {
  const todoId = "todolistID_1";
  const gen = deleteTodoSaga({ type: DELETE_TODO_ID, payload: todoId });

  expect(gen.next().value).toEqual(put(todoActions.changeEntStatusTodo({ todoId: todoId, status: "loading" })));

  expect(gen.throw("error").value).toEqual(put(appAction.setError({ error: '"error"' })));

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "failed" })));

  expect(gen.next().value).toEqual(put(todoActions.changeEntStatusTodo({ todoId: todoId, status: "idle" })));
});

test("change title todolist saga", () => {
  const todolist = { todoId: "todolistID_1", title: "saga" };
  const gen = changeTitleTodoSaga({ type: CREATE_TITLE_TODO, payload: todolist });

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(gen.next().value).toEqual(call(todolistsApi.updateTodolists, todolist.todoId, todolist.title));

  expect(gen.next(meResponse).value).toEqual(
    put(
      todoActions.changeTitleTodoAction({
        todoId: todolist.todoId,
        title: todolist.title,
      })
    )
  );

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "idle" })));
});

test("change title todolist saga error server", () => {
  const todolist = { todoId: "todolistID_1", title: "saga" };
  const gen = changeTitleTodoSaga({ type: CREATE_TITLE_TODO, payload: todolist });

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(gen.next().value).toEqual(call(todolistsApi.updateTodolists, todolist.todoId, todolist.title));

  meResponse.data.resultCode = 1;
  expect(gen.next(meResponse).value).toEqual(put(appAction.setError({ error: meResponse.data.messages[0] })));

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "failed" })));
});

test("change title todolist saga error network", () => {
  const todolist = { todoId: "todolistID_1", title: "saga" };
  const gen = changeTitleTodoSaga({ type: CREATE_TITLE_TODO, payload: todolist });

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "loading" })));

  expect(gen.next().value).toEqual(call(todolistsApi.updateTodolists, todolist.todoId, todolist.title));

  expect(gen.throw("error").value).toEqual(put(appAction.setError({ error:  "\"error\"" })));

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "failed" })));

  expect(gen.next().value).toEqual(put(appAction.setStatus({ status: "idle" })));
});

test("CHANGE TITLE TODO", () => {
  const newTodolist = todoListsReducer(todoLists, {
    type: todoActions.changeTitleTodoAction.type,
    payload: {
      todoId: "todolistID_1",
      title: "Hi",
    },
  });
  expect(newTodolist[0].title).toBe("Hi");
});
test("CHANGE ENTITY STATUS TODO", () => {
  const newTodolist = todoListsReducer(
    todoLists,
    todoActions.changeEntStatusTodo({
      todoId: "todolistID_1",
      status: "loading",
    })
  );
  expect(newTodolist[0].entityStatus).toBe("loading");
  expect(todoLists[0].entityStatus).toBe("idle");
});

test("TASK FILTER TODO", () => {
  const newTodolist = todoListsReducer(
    todoLists,
    todoActions.taskFilterTodo({
      todoListsID: "todolistID_1",
      filter: "Active",
    })
  );
  expect(newTodolist[0].filter).toBe("Active");
});

test("SET TODO", () => {
  const newTodolist = todoListsReducer([], {
    type: todoActions.setTodolistAction.type,
    payload: { todolist: todoLists },
  });
  expect(newTodolist.length).toBe(2);
});
