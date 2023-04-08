
export type StatusType =  'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateAppType = {
    //Происходит ли взаимодействие с сервером
    status: StatusType,
    //Если ошибка глобальная - запишем текст ошибки сюда.
    error: string | null,
}

const initialState: InitialStateAppType = {
    status: 'idle',
    error: null
}


export const appReducer = (state: InitialStateAppType = initialState, action: ActionsType): InitialStateAppType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state;
    }
}

//AC ================================================================
type ActionsType =
    | SetStatusACType
    | SetErrorACType;

export type SetStatusACType = ReturnType<typeof setStatusAC>;
export const setStatusAC = (status: StatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type SetErrorACType = ReturnType<typeof setErrorAC>;
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const );
