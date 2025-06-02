import {
    configureStore,
    createAction,
    createReducer,
    createSelector
} from '@reduxjs/toolkit'
import {useDispatch, useSelector, useStore} from "react-redux";
import {Theme} from "./model/Theme.ts";
import {todosSlice} from "./todos.slice.ts";

type State = {
    theme: Theme
}

export const setDarkThemeAction = createAction('setDarkTheme')
export const setLightThemeAction = createAction('setLightTheme')

const initialState: State = {
    theme: Theme.DARK,
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

export const selectTheme = (state: AppState) => state.themeReducer.theme

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
