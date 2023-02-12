import React from 'react';
import {Provider} from "react-redux";
import {AppRootState} from "../reducers/store";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "../reducers/tasksReducer";
import {todoListsReducer} from "../reducers/todoListsReducer";


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

const initialState = {
    todoLists: [
        {id: 'todolistID_1', title: 'What to learn', filter: 'All'},
        {id: 'todolistID_2', title: 'What to buy', filter: 'All'},
    ],
    tasks: {
        ['todolistID_1']: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "Next", isDone: false},
        ],
        ['todolistID_2']: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Drink", isDone: false},
        ],
    }
};
export const storyBookStore = createStore(rootReducer, initialState as AppRootState);

export const decorators = [
    (Story: any) => (
        <div style={{margin: '3em'}}>
            <Provider store={storyBookStore}>{Story()}</Provider>
        </div>
    ),
];

// export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {//Функция которая возвращает react компоненту
//     return <Provider store={store}>{storyFn()}</Provider>
// }