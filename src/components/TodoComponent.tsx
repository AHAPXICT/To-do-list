import {Todo} from "../model/Todo.ts";
import styles from "../css/Todo.module.css"
import {useState} from "react";

export default function TodoComponent({todoText}) {
    const [todo, setTodo] = useState(new Todo(todoText))
    const [isKeyFree, setIsKeyFree] = useState(false)


    function handleKeyDown(e) {
        if (isKeyFree && e.key === "Enter") {
            setIsKeyFree(false)
            setTodo({...todo, isComplete: !todo.isComplete})
        }
    }

    function handleKeyUp(e) {
        setIsKeyFree(true)
    }

    return (
        <div className={`${styles.todo} ${todo.isComplete ? styles.todo_complete : ''}`}>
            <div className={styles.todo_left_container}>
                <label className={styles.checkbox_label}>
                    <input checked={todo.isComplete}
                           onChange={() => setTodo({...todo, isComplete: !todo.isComplete})} className={styles.todo_checkbox}
                           onKeyDownCapture={(e) => handleKeyDown(e)}
                           onKeyUp={handleKeyUp}
                           type="checkbox"/>
                </label>
                <label
                    className={`${styles.todo_text} ${todo.isComplete ? styles.todo_text_complete : ''}`}>{todo.text}</label>
            </div>
            <span className="note__start-time"></span>
            <span className="note__end-time"></span>
        </div>
    )
}