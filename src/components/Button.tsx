import React, {FC} from 'react';

type ButtonType = {
    name: string,
    callBack: () => void,
}
export const Button: React.FC<ButtonType> = ({name, ...props}) => {

    const onclickHandler = () => {
        props.callBack()
    }
    return (
        <>
            <button onClick={onclickHandler}>{name}</button>
        </>
    );
};
