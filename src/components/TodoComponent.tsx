import styles from "../css/Todo.module.css"
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../model/store.ts";
import {todosSlice, Todo} from "../model/todos.slice.ts";

export default function TodoComponent({id}: { id: number }) {
    const todo: Todo = useAppSelector((state) => todosSlice.selectors.selectTodo(state, id))
    const dispatch = useAppDispatch();
    const [isKeyFree, setIsKeyFree] = useState(false)

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (isKeyFree && e.key === "Enter") {
            setIsKeyFree(false)
            dispatch(todosSlice.actions.switchIsDone({todoId: id}))
        }
    }

    function handleKeyUp() {
        setIsKeyFree(true)
    }

    function handleDeleteClick() {
        dispatch(todosSlice.actions.deleteTodo({todoId: id}))
    }

    return (
        <div
            className={`${styles.todo} ${todo.isDone ? styles.todo_complete : ''}`}>
            <div className={styles.todo_left_container}>
                <div className={styles.checkbox_label}>
                    <input checked={todo.isDone}
                           onChange={() => dispatch(todosSlice.actions.switchIsDone({todoId: id}))
                           } className={styles.todo_checkbox}
                           onKeyDownCapture={(e) => handleKeyDown(e)}
                           onKeyUp={handleKeyUp}
                           type="checkbox"
                           id={"isDoneCheckbox_" + id} />
                </div>
                <label
                    className={`${styles.todo_text} ${todo.isDone ? styles.todo_text_complete : ''}`} htmlFor={"isDoneCheckbox_" + id}>{todo.text}</label>
            </div>
            <div className={styles.time_container}>
                <span className={styles.time_element}>{todo.timeStart}</span>
                <span className={styles.time_element}>{todo.timeEnd}</span>
                <button onClick={handleDeleteClick} className={styles.delete_button}>
                    <svg width="2rem" height="2rem" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.75 9.49999H33.25M30.0833 9.49999V31.6667C30.0833 33.25 28.5 34.8333 26.9167 34.8333H11.0833C9.5 34.8333 7.91667 33.25 7.91667 31.6667V9.49999M12.6667 9.49999V6.33332C12.6667 4.74999 14.25 3.16666 15.8333 3.16666H22.1667C23.75 3.16666 25.3333 4.74999 25.3333 6.33332V9.49999M15.8333 17.4167V26.9167M22.1667 17.4167V26.9167"
                            stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    )
}