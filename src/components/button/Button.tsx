import React, {memo, useCallback} from 'react';
import s from './Button.module.css';

type ButtonType = {
    name?: string,
    callBack: () => void,
    style?: string,
    disabled?: boolean
}
export const Button: React.FC<ButtonType> = memo(({name, ...props}) => {

    const onclickHandler = useCallback(() => {
        props.callBack()
    }, [props])
    return (
        <div className={s.universalButton}>
            <button onClick={onclickHandler}
                    className={`${props.style} ${s.button} ${props.disabled && s.disabled}`}
                    disabled={props.disabled}>{name}</button>
        </div>
    );
});
