import styles from '../css/Header.module.css'
import ArrowButton from "./ArrowButton.tsx";
import lightIcon from "../icon/theme-day.svg"
import darkIcon from "../icon/theme-night.svg"
import {useState} from "react";
import {selectTheme, setDarkThemeAction, setLightThemeAction, useAppSelector} from "../store.ts";
import {useDispatch, useSelector} from "react-redux";
import {Theme} from "../model/Theme.ts";

export default function Header() {
    const dispatch = useDispatch();
    const theme: Theme = useSelector(selectTheme);

    //Старый код для переключения темы
    // const savedTheme = localStorage.getItem("theme");
    // const prefersColorScheme = window.matchMedia('(prefers-color-scheme: light)').matches ? light : dark
    // const [themeIcon, setThemeIcon] = useState(savedTheme === null ? prefersColorScheme : savedTheme)
    //
    // if (themeIcon === light) {
    //     document.body.classList.toggle("light-theme");
    // }
    //
    // function handleThemeToggle() {
    //     if (themeIcon === light) {
    //         setThemeIcon(dark);
    //     }
    //     else {
    //         setThemeIcon(light);
    //     }
    //     document.body.classList.toggle("light-theme");
    //     localStorage.setItem('theme', themeIcon)
    // }
    //Конец старого кода для переключения темы

    return (
        <header className={styles.header}>
            <div className={styles.header_left}>
                <div className={styles.header_left_menu}>Меню</div>
            </div>
            <div className={styles.header_center}>
                <ArrowButton />
                <input type="date" className={styles.date}/>
                <ArrowButton rotation={180} />
            </div>
            <div className={styles.header_right}>
                <div className={styles.search_bar}>
                    <input type="search" placeholder="Поиск" className={styles.search_bar_input}/>
                    <button className={styles.search_bar_button}>
                        <svg className={styles.search_bar_icon} width="20" fill="none" height="20" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 19L14.66 14.66M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                                stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <button className={styles.theme_button} onClick={() => dispatch(setLightThemeAction())}>
                    <img src={theme === Theme.DARK ? darkIcon : lightIcon} alt="theme image"/>
                    {theme}
                </button>
            </div>
        </header>
    )
}