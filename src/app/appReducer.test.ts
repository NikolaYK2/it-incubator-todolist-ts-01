import {appReducer, InitialStateAppType, setAppErrorAC, setAppStatusAC} from "./appReducer";

let app: InitialStateAppType;
beforeEach(() => {
    app = {
        status: 'idle',
        error: null,
        initialized:false
    };
})

test('status', () => {

    const newApp = appReducer(app, setAppStatusAC('succeeded'));

    expect(newApp.status).toBe('succeeded');
    expect(app.status).toBe('idle');
})

test('status error', () => {

    const newApp = appReducer(app, setAppErrorAC('hera se!'));

    expect(newApp.error).toBe('hera se!');
    expect(app.error).toBe(null);
})
