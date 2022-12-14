import React, {useCallback, useState} from 'react';
import {UniversalInput} from "../input/UniversalInput";
import s from "../../Todolist.module.css";
import {Button} from "../button/Button";

type FullInputType = {
    addItem: (addTitle: string) => void,
}


export const FullInput = React.memo ((props: FullInputType) => {
    //=======State Добавление таски======================================================
    const [addTitle, setAddTitle] = useState<string>('')
    console.log('add input')
    const onClickHandlerAddTask = useCallback(() => {
        if (addTitle.trim() !== '') {//что-б и пробелы не считались за символы, убираем
            props.addItem(addTitle.trim())//trim()- убираем пробелы вначале и конце
            setAddTitle('')
        } else {
            setError('Заполни полe Чувак!')
        }
    },[addTitle,props]);
//=====================================================================================

    //=====State Ошибка в случаи попытка отправки пустого поля========================
    let [error, setError] = useState<string | null>(null)
    const errorStop = error ? s.error : '';
//===================================================================================================

    //=======Добавление таски======================================================
    // Кнопка ввода ENter==================================================
    // const onKeyDownHandler =(event: KeyboardEvent<HTMLInputElement>)=>{
    //     if(event.key === "Enter"){
    //         onClickHandlerAddTask()
    //     }
    // }
//=================================================================
    return (
            <>
                {/*<input*/}
                {/*    value={addTitle}*/}
                {/*    onChange={onChangeHandlerAddTask}*/}
                {/*    onKeyDown={onKeyDownHandler}*/}
                {/*/>*/}
                <div className={s.input__block}>
                    <UniversalInput
                        setAddTitle={setAddTitle}
                        addTitle={addTitle}
                        callback={onClickHandlerAddTask}
                        setError={setError}
                        style={errorStop}
                        error={error}
                    />
                    <Button callBack={() => onClickHandlerAddTask()} style={s.addTask}/>
                </div>
                {/*{error && <div className={`${errorStop} ${s.block}`}>{error}</div>}*/}
            </>
    );
});
