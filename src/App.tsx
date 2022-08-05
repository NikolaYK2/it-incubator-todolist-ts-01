import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterValueType= "All" | 'Active' | 'Completed';

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
    //=========================ФиДЬТРАЦИЯ==============================
    const [filterValue, setFilterValue] = useState<filterValueType>("All");

    let filterTasks = tasks;
    if (filterValue === 'Active') {
        filterTasks = tasks.filter((el) => el.isDone);
        console.log(filterTasks)
    }
    if (filterValue === 'Completed') {
        filterTasks = tasks.filter(el => !el.isDone);
        console.log(filterTasks)

    }
    // const changeTasksFilter = (filterValue: filterValueType) => {
    //     setFilterValue(filterValue);
    // }
    //==================================================================
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filterTasks}
                deleteTask={deleteTask}
                addTask={addTask}
                callBackButtonAdd={callBackButtonAdd}
                setFilterValue={setFilterValue}
                // changeTasksFilter={changeTasksFilter}
            />
        </div>
    );
}

export default App;
