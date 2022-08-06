import React, {FC} from 'react';
import s from './Button.module.css';

type ButtonType = {
    name: string,
    callBack: () => void,
    style?: string,
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
