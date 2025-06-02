import styles from "../css/Todo.module.css"
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../store.ts";
import {todosSlice, Todo} from "../todos.slice.ts";

export default function TodoComponent({todoText, id}) {
    const [todo, setTodo] = useState<Todo>({id: id, text: todoText, isDone: false, timeStart: null, timeEnd: null})
    const [isKeyFree, setIsKeyFree] = useState(false)
    const dispatch = useAppDispatch()
    dispatch(todosSlice.actions.newTodo({todo: todo}))


    function handleKeyDown(e) {
        if (isKeyFree && e.key === "Enter") {
            setIsKeyFree(false)
            setTodo({...todo, isDone: !todo.isDone})
        }

    }

    function handleKeyUp(e) {
        setIsKeyFree(true)
    }

    return (
        <div
            className={`${styles.todo} ${todo.isDone ? styles.todo_complete : ''}`}>
            <div className={styles.todo_left_container}>
                <label className={styles.checkbox_label}>
                    <input checked={todo.isDone}
                           onChange={() => setTodo({
                               ...todo,
                               isDone: !todo.isDone
                           })} className={styles.todo_checkbox}
                           onKeyDownCapture={(e) => handleKeyDown(e)}
                           onKeyUp={handleKeyUp}
                           type="checkbox" />
                </label>
                <label
                    className={`${styles.todo_text} ${todo.isDone ? styles.todo_text_complete : ''}`}>{todo.text}</label>
            </div>
            <span className="note__start-time"></span>
            <span className="note__end-time"></span>
        </div>
    )
}