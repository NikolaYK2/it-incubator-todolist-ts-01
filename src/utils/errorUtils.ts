import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "app/appReducer";
import {ResponsTodolistsType} from "api/todolistsApi";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponsTodolistsType<D>, dispatch: Dispatch<SetAppErrorACType | SetAppStatusACType>)=>{
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'));
}

export const handleServerNetworkError = <D>(error: {message: string}, dispatch: Dispatch<SetAppErrorACType | SetAppStatusACType>)=>{
    dispatch(setAppErrorAC(error.message ? error.message : 'Network error!'));
    dispatch(setAppStatusAC('failed'));
}

