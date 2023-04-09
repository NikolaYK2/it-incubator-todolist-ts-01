
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
    | SetAppStatusACType
    | SetAppErrorACType;

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>;
export const setAppStatusAC = (status: StatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>;
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const );
