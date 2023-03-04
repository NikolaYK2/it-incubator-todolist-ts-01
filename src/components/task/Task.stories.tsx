import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {AppRootState} from "../../reducers/store";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "../../api/todolistsApi";
import {decorators} from "../../stories/decorators/decorator";

export default {
    title: 'Components/Task',
    component: Task,
    decorators: decorators,
    args: {
        task: {
            id: '2',
            title: 'JS',
            status: TaskStatuses.Completed,
            addedDate: '',
            startDate: '',
            deadline: '',
            order: 0,
            priority: TodoTaskPriorities.Low,
            todoListId: 'todolistID_2',
            description: ''
        },
        idTodolist: '1',
    }
} as ComponentMeta<typeof Task>;

// const changeStatusHandler = action('change status')
// const onClickHandlerDeleteTask = action('delete task')
// const onChangeHandlerTitle = action('change title')

const Template: ComponentStory<typeof Task> = (args) => {

    return (
        <Task  {...args}/>
    );
}

export const TaskExamplete1 = Template.bind({});
// TaskExamplete1.args = {
//     task: {id: '2', isDone: true, title: 'JS'},
//     idTodolist: '2',
// };
TaskExamplete1.parameters = {
    backgrounds: {
        values: [
            {title: 'red', value: '#000'},
        ],
    },

}

export const TaskExamplete2 = Template.bind({});
TaskExamplete2.args = {
    task: {
        id: '2',
        status: TaskStatuses.New,
        title: 'JS',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        todoListId: 'todolistID_2',
        description: ''
    },
};
TaskExamplete2.parameters = {
    backgrounds: {
        values: [
            {title: 'red', value: '#000'},
        ],
    },
}

//=============================================================================
// const Template1: ComponentStory<typeof Task> = () => {
//     const [task, setTask]=useState({id: '2', isDone: true, title: 'JS'})
//
//     const changeTaskTitle=()=>{
//
//     }
//     return (
//         <Task task={task}
//               idTodolist={'2'}
//         />
//     );
// }
// export const TaskControl = Template1.bind({});
// TaskControl.args = {
// };
// TaskControl.parameters = {
//     backgrounds: {
//         values: [
//             {title: 'black', value: '#000'},
//         ],
//     },
// }

//REDUX нужно обернуть в оболочку редакторскую компоненту======================================================================================
const TaskWithRedux = () => {
    const tasks = useSelector<AppRootState, TaskType>((state) => state.tasks['todolistID_1'][0]);

    return <Task task={tasks} idTodolist={'todolistID_1'}/>
}

const Template1: ComponentStory<typeof Task> = () => <TaskWithRedux/>
export const TaskStore = Template1.bind({});
TaskStore.parameters = {
    backgrounds: {
        values: [
            {title: 'black', value: '#000'},
        ],
    },
};


