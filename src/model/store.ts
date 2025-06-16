import {configureStore, createAction, createReducer, createSelector} from '@reduxjs/toolkit'
import {useDispatch, useSelector, useStore} from "react-redux";
import {Theme} from "./Theme.ts";
import {todosSlice} from "./todos.slice.ts";

export const setDarkThemeAction = createAction('setDarkTheme')
export const setLightThemeAction = createAction('setLightTheme')

//---------------------------------------
//Save and retrieve data from localStore
function saveToLocalStorage(state: any) {
    try {
        localStorage.setItem("persistentState", JSON.stringify(state));
    } catch (e) {
        console.warn(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistentState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const nowDate = new Date().setUTCHours(0, 0, 0, 0);
const newInitialState = {
    themeReducer: {theme: Theme.DARK}, todos: {
        lists: {0: {id: 0, date: nowDate, todos: []}},
        selectedListId: 0,
        selectedListDate: nowDate
    }
}

const localData = loadFromLocalStorage()
const initialStoreState = localData === undefined ? newInitialState : localData


//End save and retrieve data from localStorage
//----------------------------------------------


type State = {
    theme: Theme
}

const initialState: State = {
    theme: initialStoreState.themeReducer.theme
}
export const themeReducer = createReducer(initialState, builder => {
    builder.addCase(setDarkThemeAction, (state) => {
        if (!state.theme) {
            state.theme = initialState.theme
        }
        state.theme = Theme.DARK
    })
    builder.addCase(setLightThemeAction, (state) => {
        if (!state.theme) {
            state.theme = initialState.theme
        }
        state.theme = Theme.LIGHT
    })
})

export const store = configureStore({
    reducer: {
        themeReducer,
        [todosSlice.name]: todosSlice.reducer
    }
})
store.subscribe(() => saveToLocalStorage(store.getState()));

export const selectTheme = (state: AppState) => state.themeReducer.theme

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
