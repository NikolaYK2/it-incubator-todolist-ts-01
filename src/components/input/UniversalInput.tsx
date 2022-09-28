import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from "./UniversalInput.module.css";
import {FormControl, Input, InputLabel, TextField} from "@mui/material";
import {red} from "@mui/material/colors";


type UniversalInputType = {
    setAddTitle: (addTitle: string) => void,
    addTitle: string,
    callback: () => void,
    setError: (value: null) => void,
    style: string,

}

export const UniversalInput = (props: UniversalInputType) => {
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
            <TextField
                size='small'
                label="go go"
                variant="filled"
                value={props.addTitle}
                onChange={onChangeHandlerAddTask}
                onKeyDown={onKeyDownHandler}
                style={{maxWidth:'180px'}}
                className={`${props.style} ${s.modified}`}
            />
            {/*<input*/}
            {/*/>*/}
            {/*<TextField id="standard-basic" label="Standard" variant="standard"*/}
            {/*           value={props.addTitle}*/}
            {/*           onChange={onChangeHandlerAddTask}*/}
            {/*           onKeyDown={onKeyDownHandler}*/}
            {/*           className={`${props.style} ${s.modified}`}*/}
            {/*/>*/}
        </div>
    );
};

