import {configureStore, createAction, createReducer} from '@reduxjs/toolkit'
import {useSelector} from "react-redux";
import {Theme} from "./model/Theme.ts";

type State = {
    theme: Theme
}

export const setDarkThemeAction = createAction('setDarkTheme')
export const setLightThemeAction = createAction('setLightTheme')

const initialState: State = {
    theme: Theme.DARK
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

export const store =  configureStore({
    reducer: themeReducer,
})

export const selectTheme = (state: AppState) => state.theme
export const useAppSelector = useSelector.withTypes<AppState>()

export type AppState = ReturnType<typeof store.getState>

