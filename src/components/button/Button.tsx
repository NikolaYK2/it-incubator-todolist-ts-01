import React from 'react';
import s from './Button.module.css';
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

 type ButtonType = {
    name?: string,
    callBack: () => void,
    style?: string | any,
}
export const Button: React.FC<ButtonType> = ({name, ...props}) => {

    const onclickHandler = () => {
        props.callBack()
    }
    return (
        <div className={s.universalButton}>
            <button onClick={onclickHandler} className={`${props.style} ${s.button}`}>{name}</button>
        </div>
    );
};
