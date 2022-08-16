import React, {useState} from "react";
import './App.css';
import {TasksPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterValueType = "All" | 'Active' | 'Completed';

export type TodolistType = {
    id: string,
    title: string,
    filter: filterValueType, //Список отсортированный для всех тудулистов
}
type taskStateType = {
    [todolistID: string]: Array<TasksPropsType>
}

function App() {
    //todoLists - cписок тудулистов
    const todolistID_1 = v1();
    const todolistID_2 = v1();
    const [todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: todolistID_1, title: 'What to learn', filter: 'All',},
        {id: todolistID_2, title: 'What to buy', filter: 'All',},
    ]);

    const [tasks, setTasks] = useState<taskStateType>({//tasks переменная в которой лежат данные, в данном случаи обьекты
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "Next", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Drink", isDone: false},
        ],
    })

//Удаление таски ===============================================================================================================
    const deleteTask = (tId: string, todolistID: string) => {
        // tasks = tasks.filter((el) => el.id !== elId)
        // setTasks(tasks.filter((el) => el.id !== elId));//для обычного массива методы
        //Ассоциативный массив =======================================
        // const todoListsTasks = tasks[todolistID];
        // const updatedTasks = todoListsTasks.filter(el=>el.id !== elId)
        // const copyTasks = {...tasks}
        // copyTasks[todolistID] = updatedTasks
        // setTasks(copyTasks);
        //Сокращенный вариант ================================================
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== tId)})
    }
//===============================================================================================================================

    //=======Delete todolist========================================================================================================
    const deleteTodolist = (todolistID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID];// И нужно еще удалить объект с тасками, что бы мусора не было
    }
//====================================================================================================================================


//=======Добавление таски=====================================================================================================
    const addTask = (addTitle: string, todolistID: string) => {
        // setTasks([{id: v1(), title: addTitle, isDone: false}, ...tasks,])
//Acc. масс. =====================================================================
//const todoListsTasks = tasks[todolistID];
        // const updatedTasks = [{id: v1(), title: addTitle, isDone: false}, ...todoListsTasks];
        // const copyTasks = {...tasks};
        // copyTasks[todolistID] = updatedTasks;
        // setTasks(copyTasks);
        //Сокращенный вариант=================================================================
        setTasks({...tasks, [todolistID]: [{id: v1(), title: addTitle, isDone: false}, ...tasks[todolistID]]})
        //...tasks- раскрываем все такси и делаем копию,
        // В объекте есть св-в[todolistID] в которое вносим изм.
        // [todolistID]: [кладем сюда новый массив и все старые таски]Закидываем старые 4 таксик ...tasks[todolistID + одну новую {id: v1(), title: addTitle, isDone: false}
    }
    //========================================================================================================================

//========Checked find====================================================================================================
//     const changeStatus = (taskId: string, isDone: boolean) => {
//         let task = tasks.find((t) => t.id === taskId);//find - найди элемент массива t.id который равный true или false  и поменяй
//         if(task) {
//             task.isDone = isDone
//         }
//         setFilter([...tasks])
//     }
// ========Checked map========================================================================================================
    const changeStatus = (taskId: string, isDone: boolean, todolistID: string) => {//отображения статуса таски true или false
        //     let task = tasks.map((t) => t.id === taskId ? {...t, /*isDone: isDone - это*/ isDone} : t);
        // }
        //======Ассациативный ================
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    // ==============================================================================================================================

// =====================Фильтрация==================================================================================================
    const [filter, setFilter] = useState<filterValueType>("All");
    const changeTasksFilter = (filter: filterValueType, todoListsID: string) => {
        //     setFilterValue(filterValue);
        setTodoLists(todoLists.map(tl => tl.id === todoListsID ? {...tl, filter} : tl))
    }
//====================================================================================================================================
    const todoListsComponents = todoLists.map(tl => {
        //=========================ФиЛЬТРАЦИЯ==============================
        let filterTasks = tasks[tl.id];
        if (tl.filter === "Active") {
            // filterTasks = tasks.filter((el) => el.isDone);
            //Ассоциативный ===================================================
            filterTasks = tasks[tl.id].filter(t => t.isDone);
        }
        if (tl.filter === "Completed") {
            // filterTasks = tasks.filter(el => !el.isDone);
            //Ассоциативный ===================================================
            filterTasks = tasks[tl.id].filter(t => !t.isDone);
        }
        //==================================================================
        return (
            <Todolist
                key={tl.id}
                todoListID={tl.id}
                title={tl.title}//Название проекта
                filter={tl.filter}
                tasks={filterTasks}

                changeStatus={changeStatus}
                deleteTask={deleteTask}
                deleteTodolist={deleteTodolist}
                addTask={addTask}
                changeTasksFilter={changeTasksFilter}
            />

        )
    })

//=============================================================================================================
    return (
        <div className="App">
            {todoListsComponents}
            {/*<Todolist*/}
            {/*    //id*/}
            {/*    changeStatus={changeStatus}*/}
            {/*    title={todoLists}//Название проекта*/}
            {/*    tasks={filterTasks}*/}
            {/*    deleteTask={deleteTask}*/}
            {/*    addTask={addTask}*/}
            {/*    setFilterValue={setFilterValue}*/}
            {/*    checkedTask={checkedTask}*/}
            {/*    filterValue={filterValue}*/}

            {/*    // changeTasksFilter={changeTasksFilter}*/}
            {/*/>*/}
        </div>
    );

}

export default App;
