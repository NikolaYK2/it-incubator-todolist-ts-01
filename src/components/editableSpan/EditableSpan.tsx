import s from "./EditableSpan.module.css";
import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FormControl, Input, InputLabel, TextField} from "@mui/material";
import {blue, grey, red} from "@mui/material/colors";

type EditableSpanType = {
    title: string,
    onChange:(newValue: string)=>void,

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
    const switching =()=>{
        setEditMode(!editMode);
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
            <FormControl variant="standard">
                <Input id="component-simple"
                       value={title}
                       onChange={onChangeHandlerValue}
                       onBlur={switching}
                       onKeyDown={onKeyDownHandlerValue}
                       autoFocus
                       sx={{
                           '& > :not(style)': { color: '#f5f5f5',
                                                width: 100},
                       }}
                />
            </FormControl>
            // <TextField id="standard-basic"  variant="standard"
            //            className={s.text__input}
            //            value={title}
            //            onChange={onChangeHandlerValue}
            //            onBlur={switching}
            //            onKeyDown={onKeyDownHandlerValue}
            //            autoFocus
            // />
            : <span className={s.text} onDoubleClick={switching}>{title}</span>
    );
}