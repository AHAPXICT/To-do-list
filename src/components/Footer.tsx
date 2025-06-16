import styles from '../css/Footer.module.css'
import {useAppSelector} from "../model/store.ts";
import {todosSlice} from "../model/todos.slice.ts";

export default function Footer() {
  const todosCount = useAppSelector(todosSlice.selectors.selectTotalTodos)
  const todosCompleteCount = useAppSelector(todosSlice.selectors.selectCompletedTodos)
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_text_container}>Total todos: {todosCount}</div>
      <div className={styles.footer_text_container}>Completed todos: {todosCompleteCount}</div>
    </footer>
  )
}