import {appReducer, AppStateType, setError, setStatus} from "./appReducer";

let app: AppStateType;
beforeEach(() => {
    app = {
        status: 'idle',
        error: null,
        initialized: false
    };
})

test('status', () => {

    const newApp = appReducer(app, setStatus({status: 'succeeded'}));

    expect(newApp.status).toBe('succeeded');
    expect(app.status).toBe('idle');
})

test('status error', () => {

    const newApp = appReducer(app, setError({error: 'hera se!'}));

    expect(newApp.error).toBe('hera se!');
    expect(app.error).toBe(null);
})
