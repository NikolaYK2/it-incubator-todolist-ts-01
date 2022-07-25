import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


function App() {
    let [tasks, setFilter] = useState([//tasks переменная в которой лежат данные,в данном случаи обьекты
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: true},
        {id: v1(), title: "Next", isDone: false},
    ]);
//Удаление таски ==================================
    const deleteTask = (elId: string) => {
        // tasks = tasks.filter((el) => el.id !== elId)
        setFilter(tasks.filter((el) => el.id !== elId));
    }
//=============================================================
//=======Добавление таски======================================================
    const addTask = (addTitle: string) => {
        setFilter([ {id: v1(), title: addTitle, isDone: false}, ...tasks,])
    }

    const callBackButtonAdd = () => {

    }
    // const [filterValue, setFilterValue] = useState("All");
    //
    // let filterTasks = tasks;
    // if (filterValue === 'Active') {
    //     filterTasks = tasks.filter((el) => el.isDone);
    //     console.log(filterTasks)
    // }
    // if (filterValue === 'Completed') {
    //     filterTasks = tasks.filter(el => !el.isDone);
    //     console.log(filterTasks)
    //
    // }
    // const changeTasksFilter = (butName: string) => {
    //     setFilterValue(butName);
    // }
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasks}
                deleteTask={deleteTask}
                addTask={addTask}
                callBackButtonAdd={callBackButtonAdd}
                // changeTasksFilter={changeTasksFilter}
            />
        </div>
    );
}

export default App;
