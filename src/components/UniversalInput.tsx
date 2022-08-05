import React, {ChangeEvent, KeyboardEvent} from 'react';


type UniversalInputType={
    setAddTitle:(addTitle: string)=>void,
    addTitle:string,
    callback:()=>void,
}

export const UniversalInput = (props:UniversalInputType) => {
//добавления значений в инпут============================
    const onChangeHandlerAddTask = (event: ChangeEvent<HTMLInputElement>) => {
        props.setAddTitle(event.currentTarget.value)
    }
    //Кнопка ввода ENter==================================================
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.callback()// функция добавления таски
        }
    }

    return (
        <>
            <input
                value={props.addTitle}
                onChange={onChangeHandlerAddTask}
                onKeyDown={onKeyDownHandler}
            />

        </>
    );
};

