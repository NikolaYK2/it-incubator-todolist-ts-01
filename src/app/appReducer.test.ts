import {appReducer, InitialStateAppType, setErrorAC, setStatusAC} from "./appReducer";

let app: InitialStateAppType;
beforeEach(() => {
    app = {
        status: 'idle',
        error: null
    };
})

test('status', () => {

    const newApp = appReducer(app, setStatusAC('succeeded'));

    expect(newApp.status).toBe('succeeded');
    expect(app.status).toBe('idle');
})

test('status error', () => {

    const newApp = appReducer(app, setErrorAC('hera se!'));

    expect(newApp.error).toBe('hera se!');
    expect(app.error).toBe(null);
})
