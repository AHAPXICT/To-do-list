import styles from '../css/Header.module.css'
import ArrowButton from "./ArrowButton.tsx";
import {
  selectTheme,
  setDarkThemeAction,
  setLightThemeAction
} from "../store.ts";
import {useDispatch, useSelector} from "react-redux";
import {Theme} from "../model/Theme.ts";

export default function Header() {
  const dispatch = useDispatch();
  const theme: Theme = useSelector(selectTheme);

  function handleThemeChange() {
    if (theme === Theme.DARK) {
      dispatch(setLightThemeAction());
    } else {
      dispatch(setDarkThemeAction());
    }
    document.body.classList.toggle("light-theme");
  }

  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <div className={styles.header_left_menu}>Меню</div>
      </div>
      <div className={styles.header_center}>
        <ArrowButton />
        <input type="date" className={styles.date} />
        <ArrowButton rotation={180} />
      </div>
      <div className={styles.header_right}>
        <div className={styles.search_bar}>
          <input type="search" placeholder="Поиск"
                 className={styles.search_bar_input} />
          <button className={styles.search_bar_button}>
            <svg className={styles.search_bar_icon} width="20"
                 fill="none"
                 height="20" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 19L14.66 14.66M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                stroke="#E3E3E3" strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <button className={styles.theme_button}
                onClick={handleThemeChange}>
          <svg
            className={theme === Theme.DARK ? styles.theme_icon_disabled : styles.theme_icon}
            width="26" height="26" viewBox="0 0 30 30" fill="none"
            color="Black"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 1.66667V4.33333M15 25.6667V28.3333M5.57329 5.57333L7.45329 7.45333M22.5466 22.5467L24.4266 24.4267M1.66663 15H4.33329M25.6666 15H28.3333M7.45329 22.5467L5.57329 24.4267M24.4266 5.57333L22.5466 7.45333M20.3333 15C20.3333 17.9455 17.9455 20.3333 15 20.3333C12.0544 20.3333 9.66663 17.9455 9.66663 15C9.66663 12.0545 12.0544 9.66667 15 9.66667C17.9455 9.66667 20.3333 12.0545 20.3333 15Z"
              stroke="#EAE491" strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
          <svg
            className={theme === Theme.LIGHT ? styles.theme_icon_disabled : styles.theme_icon}
            width="26"
            height="26" viewBox="0 0 26 26" color="#EAE491"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 3.25C11.7071 4.54293 10.9807 6.29652 10.9807 8.125C10.9807 9.95348 11.7071 11.7071 13 13C14.2929 14.2929 16.0465 15.0193 17.875 15.0193C19.7035 15.0193 21.4571 14.2929 22.75 13C22.75 14.9284 22.1782 16.8134 21.1068 18.4168C20.0355 20.0202 18.5127 21.2699 16.7312 22.0078C14.9496 22.7458 12.9892 22.9389 11.0979 22.5627C9.20656 22.1865 7.46928 21.2579 6.10571 19.8943C4.74215 18.5307 3.81355 16.7934 3.43735 14.9021C3.06114 13.0108 3.25422 11.0504 3.99218 9.26884C4.73013 7.48726 5.97982 5.96452 7.58319 4.89317C9.18657 3.82183 11.0716 3.25 13 3.25Z"
              stroke="#EAE491" strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </header>
  )
}