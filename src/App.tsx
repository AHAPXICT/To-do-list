import './css/app.css'
import './css/reset.css'
import ListComponent from './components/ListComponent.tsx'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import {useDispatch} from "react-redux";
import {setDarkThemeAction, setLightThemeAction} from "./store.ts";

export default function App() {

    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: light)').matches
    const dispatch = useDispatch();

    if (prefersColorScheme) {
        document.body.classList.add('light-theme')
        dispatch(setLightThemeAction())
    }

    return (
        <>
            <Header/>
            <ListComponent/>
            <Footer/>
        </>
    )
}
