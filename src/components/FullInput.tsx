import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import {UniversalInput} from "./UniversalInput";

type FullInputType={
    addTask:(addTitle: string)=>void,
    setAddTitle:(addTitle: string)=>void,
    addTitle:string,
}
// type FullInputType={
//     addTask:(addTitle: string)=>void,
//     setAddTitle:(el: string)=>void,
//     addTitle: string,
// }



export const FullInput = (props: FullInputType) => {
    //=======Добавление таски======================================================
    // const [addTitle, setAddTitle] = useState('')

    // const onClickHandlerAddTask = (addTitle: string) => {
    //     props.addTask(addTitle)
    //     props.setAddTitle('')
    // }
    //============================================================================
    // const [addTitle, setAddTitle] = useState('')
    //
    // const onClickHandlerAddTask = (addTitle: string) => {
    //     props.addTask(addTitle)
    //     props.setAddTitle('')
    // }
    // const onChangeHandlerAddTask =(event: ChangeEvent<HTMLInputElement>)=>{
    //     props.setAddTitle(event.currentTarget.value)
    // }
    // //Кнопка ввода ENter==================================================
    // const onKeyDownHandler =(event: KeyboardEvent<HTMLInputElement>)=>{
    //     if(event.key === "Enter"){
    //         onClickHandlerAddTask(props.addTitle)
    //     }
    // }
//=================================================================
    return (
        <div>
            <div>
                {/*<input*/}
                {/*    value={addTitle}*/}
                {/*    onChange={onChangeHandlerAddTask}*/}
                {/*    onKeyDown={onKeyDownHandler}*/}
                {/*/>*/}
                {/*<UniversalInput setAddTitle={props.addTask}*/}
                {/*                onClickHandlerAddTask={onClickHandlerAddTask}*/}
                {/*                addTitle={props.addTitle}/>*/}
                {/*<Button name='+' callBack={()=>onClickHandlerAddTask(props.addTitle)}/>*/}
                {/*<button onClick={onClickHandlerAddTask}>+</button>*/}
            </div>
        </div>
    );
};
