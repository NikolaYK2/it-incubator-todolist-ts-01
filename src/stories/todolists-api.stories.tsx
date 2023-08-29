import React, { useEffect, useState } from "react";
import { todolistsApi } from "features/todolistsList/todolist/todolistsApi";
import { tasksApi } from "features/todolistsList/todolist/task/tasksApi";

export default {
  title: "API",
};

//TODOl =====================================================
export const GetTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    todolistsApi.getTodolists().then((data) => {
      setState(data);
    });

    // todolistsApi.getTodolists().then(data=>{ - как пример с зарезолвленной сразу датой в DALL
    //     setState(data);
    // });

    // const fun = async ()=>{
    //     return setState(await todolistsApi.getTodolists());
    // }
    // fun();
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  // useEffect(() => {
  //     todolistsApi.createTodolists('Nik')
  //         // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'Dim'}, settings)
  //         .then((res) => {
  //             setState(res.data);
  //         })
  // }, [])
  const addTaskHandle = (title: string) => {
    todolistsApi
      .createTodolists(title)
      // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'Dim'}, settings)
      .then((res) => {
        setState(res.data);
      });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={"task"}
        value={state}
        onChange={(e) => {
          setState(e.currentTarget.value);
        }}
      />
      <button onClick={() => addTaskHandle(state)}>add</button>
    </div>
  );
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todoId, setTodoId] = useState<string>("");
  // useEffect(() => {
  //     const todolistId = '5f5283bc-64a0-46d9-af00-308cb33e4cb7';
  //     todolistsApi.deleteTodolists(todolistId)
  //         // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
  //         .then((res) => {
  //             setState(res.data);
  //         })
  //
  // }, [])
  const deleteTodoHandle = () => {
    todolistsApi
      .deleteTodolists(todoId)
      // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
      .then((res) => {
        setState(res.data);
      });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={"todoId"}
        value={todoId}
        onChange={(e) => {
          setTodoId(e.currentTarget.value);
        }}
      />
      <button onClick={deleteTodoHandle}>delete</button>
    </div>
  );
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todoId, setTodoId] = useState<string>("");
  const [name, setName] = useState<string>("");
  // useEffect(() => {
  //     const todolistId = '5f5283bc-64a0-46d9-af00-308cb33e4cb7';
  //     todolistsApi.updateTodolists(todolistId, 'Nik')
  //         // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'Nik'}, settings)
  //         .then((res) => {
  //             setState(res.data);
  //         })
  // }, [])

  const updTodoHandle = () => {
    todolistsApi
      .updateTodolists(todoId, name)
      // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'Nik'}, settings)
      .then((res) => {
        setState(res.data);
      });
  };
  return (
    <div>
      {JSON.stringify(state)}
      <input
        placeholder={"todoId"}
        value={todoId}
        onChange={(e) => {
          setTodoId(e.currentTarget.value);
        }}
      />
      <input
        placeholder={"name"}
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
      />
      <button onClick={updTodoHandle}>upd</button>
    </div>
  );
};

//TASK==============================================================
export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [id, setId] = useState<any>(null);
  const [todoId, setTodoId] = useState<string[]>([]);

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      setTodoId(res.data.map((e) => e.id));
    });
  }, []);

  // useEffect(() => {
  //     todolistsApi.getTasks(todoIdStr)
  //         .then((res) => {
  //             setState(res.data);
  //         })
  // }, [todoIdStr])

  const clickHandle = (todoIdStr: string) => {
    tasksApi.getTasks(todoIdStr).then((res) => {
      setState(res.data /*.items.map(e=>e.title)*/);
      setId(res.data.items.map((e) => e.id));
    });
  };
  return (
    <div>
      {JSON.stringify(state)}
      {JSON.stringify(id)}
      <div>--------------------------------------</div>
      {todoId.map((id) => {
        return <div onClick={() => clickHandle(id)}>{id}</div>;
      })}
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todoId, setTodoId] = useState<any>("");
  const [title, setTitle] = useState<any>("");

  const arg = { todoId: "", title: "" };
  // useEffect(() => {
  //     const todoId = '';
  //     todolistsApi.createTask(todoId, 'Nik')
  //         // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'Dim'}, settings)
  //         .then((res) => {
  //             setState(res.data);
  //         })
  // }, [])
  const taskChangeHandle = () => {
    tasksApi
      .createTask(arg) //был todoId title
      // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'Dim'}, settings)
      .then((res) => {
        setState(res.data);
      });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input placeholder="todoId" value={todoId} onChange={(e) => setTodoId(e.currentTarget.value)} />
      <input placeholder="nameTask" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      <button onClick={taskChangeHandle}>add</button>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskId, setTaskId] = useState<string>("");
  const [todoId, setTodoId] = useState<string>("");
  // useEffect(() => {
  //     const todolistId = '6468e39a-5463-442c-858e-c1202f2fa4cd';
  //     const taskId = '6468e39a-5463-442c-858e-c1202f2fa4cd';
  //     todolistsApi.deleteTask(todolistId, taskId)
  //         .then((res) => {
  //             setState(res.data);
  //         })
  //
  // }, [])

  const deleteHandle = () => {
    tasksApi.deleteTask(todoId, taskId).then((res) => {
      setState(res.data);
    });
  };
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todoId}
          onChange={(e) => {
            setTodoId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={"taskId"}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value);
          }}
        />
        <button onClick={deleteHandle}>delete task</button>
      </div>
    </div>
  );
};

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null);
  const [taskId, setTaskId] = useState<string>("");
  const [todoId, setTodoId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  // useEffect(() => {
  //     const todolistId = '5f5283bc-64a0-46d9-af00-308cb33e4cb7';
  //     const taskId = '5f5283bc-64a0-46d9-af00-308cb33e4cb7';
  //     let title: any = null;
  //     todolistsApi.updateTask(todolistId, taskId, title)
  //         // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'Nik'}, settings)
  //         .then((res) => {
  //             setState(res.data);
  //         })
  //
  // }, [])
  const arg = {
    todoId: "",
    taskId: "",
    model: {
      title: title,
      description: description,
      status: status,
      priority: priority,
      startDate: "",
      deadline: "",
    },
  };
  const clickHandle = () => {
    tasksApi
      // .updateTask(todoId, taskId, {
      //   title: title,
      //   description: description,
      //   status: status,
      //   priority: priority,
      //   startDate: "",
      //   deadline: "",
      // })
      .updateTask(arg,{
        title: title,
        description: description,
        status: status,
        priority: priority,
        startDate: "",
        deadline: "",
      },)
      .then((res) => {
        setState(res.data);
      });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input placeholder="taskId" value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} />
      </div>
      <div>
        <input placeholder="todoId" value={todoId} onChange={(e) => setTodoId(e.currentTarget.value)} />
      </div>
      <div>
        <input placeholder="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      </div>
      <div>
        <input placeholder="description" value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
      </div>
      <div>
        <input placeholder="status" value={status} type="number" onChange={(e) => setStatus(+e.currentTarget.value)} />
      </div>
      <div>
        <input
          placeholder="priority"
          value={priority}
          type="number"
          onChange={(e) => setPriority(+e.currentTarget.value)}
        />
      </div>
      <button onClick={clickHandle}>add</button>
    </div>
  );
};
