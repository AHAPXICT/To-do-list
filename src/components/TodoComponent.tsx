import styles from "../css/Todo.module.css"
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../store.ts";
import {todosSlice, Todo} from "../todos.slice.ts";

export default function TodoComponent({id}: {id: number}) {
    // const [todo, setTodo] = useState<Todo>(todoEl)
    const todo: Todo = useAppSelector((state) => todosSlice.selectors.selectTodo(state, id))
    const dispatch = useAppDispatch();
    const [isKeyFree, setIsKeyFree] = useState(false)

    function handleKeyDown(e: KeyboardEvent) {
        if (isKeyFree && e.key === "Enter") {
            setIsKeyFree(false)
            // todo.isDone = !todo.isDone
            dispatch(todosSlice.actions.switchIsDone({todoId: id}))
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
                           onChange={() => dispatch(todosSlice.actions.switchIsDone({todoId: id}))
                    } className={styles.todo_checkbox}
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