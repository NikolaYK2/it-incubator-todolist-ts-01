import s from "./EditableSpan.module.css";
import React, {useState, KeyboardEvent, ChangeEvent, useCallback, memo} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string,
    onChange: (newValue: string) => void,

}
//Делаем спан инпутом когданужно=========================================================
export const EditableSpan = /*React.*/memo((props: EditableSpanType) => {//можно писать теперь просто memo
    console.log('editblSpan');
    //==Делаем управление не из вне, а state управление самой компонентой
    //=====CONTROL EDITSPAN TASK=====================================================================
    let [editMode, setEditMode] = useState(false);
    //=====CONTROL VALUE=====================================================================
    let [title, setTitle] = useState(props.title);//props.title cо старта будет то значение котрое приходит в пропсах

    // const activateEditMode = () => {
    //     setEditMode(true);
    //     setTitle(props.title);
    // }
    // const activateViewMode = () => {
    //     setEditMode(false);
    //     props.onChange(title);
    // }
    //Сокращенный вариант=============
    const switching = useCallback(() => {
        if (title !== '') {
            setEditMode(!editMode);
        }
        props.onChange(title);
    },[props, title, editMode]);
//=============================================================================
    //=====CONTROL VALUE=====================================================================
    const onChangeHandlerValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    },[]);
    const onKeyDownHandlerValue = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            switching();
        }
    },[switching]);

    // ============================================================================
    return (
        editMode
            ?
            /*<input className={s.text__input}
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
});