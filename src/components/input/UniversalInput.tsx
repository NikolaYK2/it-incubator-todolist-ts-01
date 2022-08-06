import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from "./UniversalInput.module.css";


type UniversalInputType={
    setAddTitle:(addTitle: string)=>void,
    addTitle:string,
    callback:()=>void,
    setError:(value: null)=>void,
    style: string,
}

export const UniversalInput = (props:UniversalInputType) => {
//добавления значений в инпут============================
    const onChangeHandlerAddTask = (event: ChangeEvent<HTMLInputElement>) => {
        props.setError(null)//Когда начинаем писать, ошибка пропадает / можно это прописать и в onKey
        props.setAddTitle(event.currentTarget.value);

    }
    //Кнопка ввода ENter==================================================
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.callback()// функция добавления таски
        }
    }

    return (
        <div className={s.universalInput}>
            <input
                value={props.addTitle}
                onChange={onChangeHandlerAddTask}
                onKeyDown={onKeyDownHandler}
                className={`${props.style} ${s.modified}`}
            />
        </div>
    );
};

