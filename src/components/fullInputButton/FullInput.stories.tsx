import {ComponentMeta, ComponentStory} from "@storybook/react";
import {FullInput} from "./FullInput";
import React, {useCallback, useState} from "react";
import {action} from "@storybook/addon-actions";
import s from "../../features/todolistsList/todolist/Todolist.module.css";
import {UniversalInput} from "../input/UniversalInput";
import {Button} from "../button/Button";

export default {
    title: 'Components/FullInput',
    component: FullInput,
    argTypes:{
        addItem:{//onClick - убираем, поскольку к нам приходит в компоненту addItem
            description:'button clicked inside from'
        }
    }
} as ComponentMeta<typeof FullInput>;

// const callback = action('Button add');

const Template: ComponentStory<typeof FullInput> = (args) => <FullInput {...args} />;
export const FullInputExample = Template.bind({});
FullInputExample.args = {
    // addItem:callback,
    addItem:action('button clicked inside from')
};
//================================================================================

const Template1: ComponentStory<typeof FullInput> = (args) => {
    const [addTitle, setAddTitle] = useState<string>('');

    const onClickHandlerAddTask = useCallback(() => {
        if (addTitle.trim() !== '') {//что-б и пробелы не считались за символы, убираем
            args.addItem(addTitle.trim())//trim()- убираем пробелы вначале и конце
            setAddTitle('')
        } else {
            setError('Заполни полe Чувак!')
        }
    },[addTitle,args]);
//=====================================================================================

    //=====State Ошибка в случаи попытка отправки пустого поля========================
    let [error, setError] = useState<string | null>('Заполни полe Чувак!')
    const errorStop = error ? s.error : '';
//===================================================================================================

    return (
        <>

            <div className={s.input__block}>
                <UniversalInput
                    setAddTitle={setAddTitle}
                    addTitle={addTitle}
                    callback={onClickHandlerAddTask}
                    setError={setError}
                    style={errorStop}
                    error={error}
                />
                <Button callBack={onClickHandlerAddTask} style={s.addTask}/>

            </div>
        </>
    );

}
export const FullInputError = Template1.bind({});
FullInputError.args = {
    addItem:action('button clicked inside from')
};

