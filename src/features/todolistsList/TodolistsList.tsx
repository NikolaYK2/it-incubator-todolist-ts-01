import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux/";
import {AppRootState, AppThunkDispatch} from "../../app/store";
import {addTodoThunkCreator, setTodolistsThunkCreator, TodoAppType} from "./todoListsReducer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./todolist/Todolist";
import {FullInput} from "../../components/fullInputButton/FullInput";

type TodolistsListType = {
    demo?: boolean
}
export const TodolistsList: React.FC<TodolistsListType> = ({demo = false}) => {

    const dispatch = useDispatch<AppThunkDispatch>();
    const todoLists = useSelector<AppRootState, TodoAppType[]>((state) => state.todoLists);

    //Достаем тудулисты ========================================
    useEffect(() => {
        if (demo){
            return;
        }
        dispatch(setTodolistsThunkCreator());//С функцией TC
        // dispatch(setTodolistsThunkCreator); //Без функции TC
        // setTodolistsThunkCreator(dispatch);
        //
        // todolistsApi.getTodolists()
        //     .then(res=>{
        //         dispatch(setTodolistsAC(res.data));
        //     })
    }, [])

//         const tasks = useSelector<AppRootState, taskStateType>((state)=>state.tasks);
// //=======Добавление таски=====================================================================================================
//     const addTask = (addTitle: string, todolistID: string) => {
// //         setTasks([{id: v1(), title: addTitle, isDone: false}, ...tasks,])
// // Acc. масс. =====================================================================
// // const todoListsTasks = tasks[todolistID];
// //         const updatedTasks = [{id: v1(), title: addTitle, isDone: false}, ...todoListsTasks];
// //         const copyTasks = {...tasks};
// //         copyTasks[todolistID] = updatedTasks;
// //         setTasks(copyTasks);
// //         Сокращенный вариант=================================================================
// //         setTasks({...tasks, [todolistID]: [{id: v1(), title: addTitle, isDone: false}, ...tasks[todolistID]]})
// //         ...tasks- раскрываем все такси и делаем копию,
// //         В объекте есть св-в[todolistID] в которое вносим изм.
// //         [todolistID]: [кладем сюда новый массив и все старые таски]Закидываем старые 4 таксик ...tasks[todolistID + одну новую {id: v1(), title: addTitle, isDone: false}
//         dispatch(addTaskAC(addTitle, todolistID))
//     }
// //Удаление таски ===============================================================================================================
//     const deleteTask = (todolistID: string, tId: string,) => {
//         // tasks = tasks.filter((el) => el.id !== elId)
//         // setTasks(tasks.filter((el) => el.id !== elId));//для обычного массива методы
//         //Ассоциативный массив =======================================
//         // const todoListsTasks = tasks[todolistID];
//         // const updatedTasks = todoListsTasks.filter(el=>el.id !== elId)
//         // const copyTasks = {...tasks}
//         // copyTasks[todolistID] = updatedTasks
//         // setTasks(copyTasks);
//         //Сокращенный вариант ================================================
//         // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== tId)})
//         //tasks[todolistID] не надо, так как мы уже в объекте после копии ...tasks, по этому просто [todolistID]
//         dispatch(deleteTaskAC(todolistID, tId))
//     }
// // Передача наверх изм. title tasks=============================================================================
//     const changeTaskTitle = (taskId: string, newValue: string, todolistID: string) => {
//         // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newValue} : t)});
//         dispatch(changeTaskTitleAC(taskId, newValue, todolistID))
//     }
// ============================================================================

// ========Добавление Todolist=============================================================
    const addTodolist = useCallback((title: string) => {
        // let todolist: TodolistType = {id: v1(), title, filter: 'All',}
        // setTodoLists([todolist, ...todoLists])
        // setTasks({...tasks, [todolist.id]: []})
        // dispatch(addTodolistAC(title, todolistID));
        // const todolistID = v1();
        // dispatch(addTodolistAC(title, todolistID));
        dispatch(addTodoThunkCreator(title));
    }, [dispatch]);
    //=======Delete todolist========================================================================================================
    // const deleteTodolist = (todolistID: string) => {
    //     // setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
    //     // delete tasks[todolistID];// И нужно еще удалить объект с тасками, что бы мусора не было
    //     // dispatch(deleteTodolistAC(todolistID))
    //     dispatch(deleteTodolistAC(todolistID))
    // }
    //Изм. title todolist==========================================================================
    // const onChangeHandlerTitleTodolist = (todoId: string, newValue: string,) => {
    //     // setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, title: newValue} : tl));
    //     dispatch(onChangeHandlerTitleTodolistAC(todoId, newValue))
    // }
//====================================================================================================================================

//========Checked find====================================================================================================
//     const changeStatus = (taskId: string, isDone: boolean) => {
//         let task = tasks.find((t) => t.id === taskId);//find - найди элемент массива t.id который равный true или false  и поменяй
//         if(task) {
//             task.isDone = isDone
//         }
//         setFilter([...tasks])
//     }
// ========Checked map task========================================================================================================
//     const changeStatus = (taskId: string, isDone: boolean, todolistID: string) => {//отображения статуса таски true или false
//         //     let task = tasks.map((t) => t.id === taskId ? {...t, /*isDone: isDone - это*/ isDone} : t);
//         // }
//         //======Ассациативный ================
//         // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone} : t)})
//         dispatch(changeStatusAC(taskId, isDone, todolistID))
//     }
    // ==============================================================================================================================

// =====================Фильтрация==================================================================================================
//     const changeTasksFilter = (todoListsID: string, filter: filterValueType,) => {
//         //     setFilterValue(filterValue);
//         // setTodoLists(todoLists.map(tl => tl.id === todoListsID ? {...tl, filter} : tl))
//         //map создает новый массив так что копию(...todolist) делать не надо
//         dispatch(changeTasksFilterAC(todoListsID, filter))
//     }
//===============================================================================================


    const todoListsComponents = todoLists.map(tl => {
        // //=========================ФиЛЬТРАЦИЯ==============================
        // let filterTasks = tasks[tl.id];//[tl.id] - обращение к конкретному тудулисту, то есть его id
        // if (tl.filter === "Active") {
        //     // filterTasks = tasks.filter((el) => el.isDone);
        //     //Ассоциативный ===================================================
        //     filterTasks = tasks[tl.id].filter(t => t.isDone);
        // }
        // if (tl.filter === "Completed") {
        //     // filterTasks = tasks.filter(el => !el.isDone);
        //     //Ассоциативный ===================================================
        //     filterTasks = tasks[tl.id].filter(t => !t.isDone);
        // }
        // //==================================================================

        return (
            <Grid item key={tl.id}>
                <Paper style={{backgroundColor: "rgba(0, 0, 0, 0.7)", boxShadow: "1px 1px 10px grey", padding: '10px'}}>
                    <Todolist
                        todolist={tl}
                        demo={demo}
                        // todoListID={tl.id}
                        // title={tl.title}//Название проекта
                        // filter={tl.filter}
                        // tasks={filterTasks}
                        //
                        // deleteTodolist={deleteTodolist}
                        // changeTasksFilter={changeTasksFilter}
                        // changeStatus={changeStatus}
                        // deleteTask={deleteTask}
                        // addItem={addTask}
                        // changeTaskTitle={changeTaskTitle}//редактирование таски title
                        // onChangeTitleTodolist={onChangeHandlerTitleTodolist}
                    />
                </Paper>
            </Grid>
        )
    })

//============================================================================================

    return (
        <Container fixed>
            <Grid container style={{padding: '10px', height: '70px'}}>
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
    );

}