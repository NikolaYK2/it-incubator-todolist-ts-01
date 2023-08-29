import {
  todoActions,
  TodoAppType,
  todoListsReducer,
  todoThunk,
} from "features/todolistsList/todolist/todoListsReducer";

let todoLists: TodoAppType[];
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
});
test("add new todolist", () => {
  // const todoLists: TodolistType[] = [
  //     {id: todolistID_1, title: 'What to learn', filter: 'All'},
  //     {id: todolistID_2, title: 'What to buy', filter: 'All'},
  // ];
  const newTodolist = todoListsReducer(
    todoLists,
    {
      type: todoThunk.addTodoThunkCreator.fulfilled.type,
      payload:{
        todolist: {
          id: "todolistID_1",
          title: "What to learn",
          order: 0,
          addedDate: "",
        },
      }
    }
  );
  expect(newTodolist.length).toBe(3);
  expect(todoLists.length).toBe(2);
});

test("delete todolist", () => {
  const newTodolist = todoListsReducer(todoLists, {
    type: todoThunk.addTodoThunkCreator.fulfilled.type,
    payload: {
      todolist: {
        todolistID: "todolistID_1"
      }
    }
  });
  expect(newTodolist.length).toBe(1);
});

test("CHANGE TITLE TODO", () => {
  const newTodolist = todoListsReducer(
    todoLists,
    todoActions.changeTitleTodo({
      todoId: "todolistID_1",
      title: "Hi",
    })
  );
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
    type: todoThunk.setTodolistsThunkCreator.fulfilled.type,
    payload: { todolist: todoLists },
  });
  expect(newTodolist.length).toBe(2);
});

//===============================================================================================================================
// test('add new todolist',()=>{
//     const todolistID_1 = v1();
//     const todolistID_2 = v1();
//
//     const todolistID = v1();
//     const title = 'new title'
//
//     const todoLists: TodolistType[] = [
//         {id: todolistID_1, title: 'What to learn', filter: 'All'},
//         {id: todolistID_2, title: 'What to buy', filter: 'All'},
//     ];
//     const newTodolist = todoListsReducer(todoLists, {type: 'ADD-TODO', payload: {title, todolistID}});
//     expect(newTodolist.length).toBe(3)
//     expect(todoLists.length).toBe(2)
// })
//
// test('delete Todolist',()=>{
//     const todolistID_1 = v1();
//     const todolistID_2 = v1();
//
//     const todolistID = v1();
//
//     const todoLists: TodolistType[] = [
//         {id: todolistID_1, title: 'What to learn', filter: 'All'},
//         {id: todolistID_2, title: 'What to buy', filter: 'All'},
//     ];
//     const newTodolist = todoListsReducer(todoLists, {type: 'DELETE-TODO', payload: {todolistID: todolistID_1}});
//     expect(newTodolist.length).toBe(1)
//     expect(todoLists.length).toBe(2)
// })
//
// test('on Change Title Todolist',()=>{
//     const todolistID_1 = v1();
//     const todolistID_2 = v1();
//
//     const title = 'Hi'
//
//     const todoLists: TodolistType[] = [
//         {id: todolistID_1, title: 'What to learn', filter: 'All'},
//         {id: todolistID_2, title: 'What to buy', filter: 'All'},
//     ];
//     const newTodolist = todoListsReducer(todoLists, {type: 'CHANGE-TITLE-TODO', payload: {newValue: title, todoId: todolistID_1}});
//     expect(newTodolist[0].title).toBe('Hi')
// })
//
// test('change Tasks Filter',()=>{
//     const todolistID_1 = v1();
//     const todolistID_2 = v1();
//
//     const filter: filterValueType = 'Active'
//
//     const todoLists: TodolistType[] = [
//         {id: todolistID_1, title: 'What to learn', filter: 'All'},
//         {id: todolistID_2, title: 'What to buy', filter: 'All'},
//     ];
//     const newTodolist = todoListsReducer(todoLists, {type: 'TASK-FILTER-TODO', payload: {todoListsID: todolistID_2, filter}});
//     expect(newTodolist[1].filter).toBe('Active')
// })
