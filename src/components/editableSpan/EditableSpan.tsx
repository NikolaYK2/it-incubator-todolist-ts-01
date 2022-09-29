import s from "./EditableSpan.module.css";
import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string,
    onChange: (newValue: string) => void,

}
//Делаем спан инпутом когданужно=========================================================
export const EditableSpan = (props: EditableSpanType) => {
    //==Делаем управление не из вне, а state управление самой компонентой
    //=====CONTROL EDITSPAN TASK=====================================================================

    let [editMode, setEditMode] = useState(false);
    // const activateEditMode = () => {
    //     setEditMode(true);
    //     setTitle(props.title);
    // }
    // const activateViewMode = () => {
    //     setEditMode(false);
    //     props.onChange(title);
    // }
    //Сокращенный вариант=============
    const switching = () => {
        if (title !== '') {
            setEditMode(!editMode);
        }
        props.onChange(title);
    }
//=============================================================================
    //=====CONTROL VALUE=====================================================================

    let [title, setTitle] = useState(props.title);//props.title cо старта будет то значение котрое приходит в пропсах
    const onChangeHandlerValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyDownHandlerValue = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            switching();
        }
    }

    // ============================================================================
    return (
        editMode
            ? /*<input className={s.text__input}
                     value={title}
                     onChange={onChangeHandlerValue}
                     onBlur={switching}
                     onKeyDown={onKeyDownHandlerValue}
                     autoFocus/>*/
            <TextField
                label={title === '' ? 'add & dell' : ''}
                error={!title}
                value={title}
                size='small'
                variant='filled'
                onChange={onChangeHandlerValue}
                onBlur={switching}
                onKeyDown={onKeyDownHandlerValue}
                autoFocus
                sx={{input:{color: '#f5f5f5', width: '100px', padding:'10px 0 0 0'}}}
            />
            : <span className={s.text} onDoubleClick={switching}>{title}</span>
    );
}