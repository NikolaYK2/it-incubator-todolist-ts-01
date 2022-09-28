import React, {useState} from "react";
import './App.css';
import {TasksPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {FullInput} from "./components/fullInputButton/FullInput";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {blue, grey} from "@mui/material/colors";
import ButtonAppBar from "./components/buttonAppBar/ButtonAppBar";

export type filterValueType = "All" | 'Active' | 'Completed';

export type TodolistType = {
    id: string,
    title: string,
    filter: filterValueType, //Список отсортированный для всех тудулистов
}
type taskStateType = {
    [todolistID: string]: TasksPropsType[];
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
//Удаление таски ===============================================================================================================
    const deleteTask = (todolistID: string, tId: string,) => {
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
        //tasks[todolistID] не надо, так как мы уже в объекте после копии ...tasks, по этому просто [todolistID]
    }
// Передача наверх изм. title tasks=============================================================================
    const changeTaskTitle = (taskId: string, newValue: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)})
    }
// ============================================================================

// ========Добавление Todolist=============================================================
    const addTodolist = (title: string) => {
        let todolist: TodolistType = {id: v1(), title, filter: 'All',}
        setTodoLists([todolist, ...todoLists])
        setTasks({...tasks, [todolist.id]: []})
    }
    //=======Delete todolist========================================================================================================
    const deleteTodolist = (todolistID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID];// И нужно еще удалить объект с тасками, что бы мусора не было
    }
    //Изм. title todolist==========================================================================
    const onChangeHandlerTitleTodolist = (todoId: string, newValue: string,) => {
        setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, title: newValue} : tl));
    }
//====================================================================================================================================

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
    const changeTasksFilter = (todoListsID: string, filter: filterValueType,) => {
        //     setFilterValue(filterValue);
        setTodoLists(todoLists.map(tl => tl.id === todoListsID ? {...tl, filter} : tl))
        //map создает новый массив так что копию(...todolist) делать не надо
    }
//===============================================================================================


    const todoListsComponents = todoLists.map(tl => {
        //=========================ФиЛЬТРАЦИЯ==============================
        let filterTasks = tasks[tl.id];//[tl.id] - обращение к конкретному тудулисту, то есть его id
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
            <Grid item key={tl.id}>
                <Paper style={{backgroundColor: "rgba(0, 0, 0, 0.7)", boxShadow: "1px 1px 10px grey", padding: '10px'}}>
                    <Todolist
                        todoListID={tl.id}
                        title={tl.title}//Название проекта
                        filter={tl.filter}
                        tasks={filterTasks}

                        changeStatus={changeStatus}
                        deleteTask={deleteTask}
                        deleteTodolist={deleteTodolist}
                        addItem={addTask}
                        changeTasksFilter={changeTasksFilter}
                        changeTaskTitle={changeTaskTitle}//редактирование таски title
                        onChangeHandlerTitleTodolist={onChangeHandlerTitleTodolist}
                    />
                </Paper>
            </Grid>
        )
    })

//============================================================================================
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'10px', height: '70px'}}>
                    <FullInput addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListsComponents}
                </Grid>
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
            </Container>
        </div>
    );

}

export default App;
