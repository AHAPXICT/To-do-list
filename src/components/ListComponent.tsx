import TodoComponent from "./TodoComponent.tsx";
import {useRef, useState} from "react";
import styles from "../css/List.module.css"
import styles2 from "../css/Todo.module.css"
import {store, useAppDispatch, useAppSelector} from "../store.ts";
import {Todo, todosSlice} from "../todos.slice.ts";

let todo: Todo

export default function ListComponent() {
  const [todoText, setTodoText] = useState("");
  const textInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch()

  const todos = useAppSelector(todosSlice.selectors.selectTodos)
  const selectedListId = useAppSelector(todosSlice.selectors.selectSelectedListId)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (todoText.length < 1) {
      console.log(null, 'Enter note header')
      return;
    }

    const id = Object.values(store.getState().todos.lists[selectedListId].todos).length
    todo = {id: id, text: todoText, isDone: false, timeStart: null, timeEnd: null}
    dispatch(todosSlice.actions.newTodo({todo: todo}))
    setTodoText("")
    textInputRef.current?.focus()
  }

  return (
    <main className={styles.main}>
      <h2>List</h2>
      <form className={styles.add_todo_main} onSubmit={handleSubmit}>
        <div className={styles2.todo}>
          <input ref={textInputRef}
                 className={`${styles.add_todo_text} ${styles.todo_input}`}
                 type='text' value={todoText} placeholder="Enter To-Do name"
                 onChange={(e) => setTodoText(e.target.value)} />
          <div className={styles.add_time_container}>
            <input className={`${styles.add_time_start} ${styles.todo_input}`}
                   type='time'
                   value={Date()}></input>
            <input className={`${styles.add_time_end} ${styles.todo_input}`}
                   type='time'
                   value={Date()}></input>
          </div>
        </div>
        <button className={styles.add_todo_button} type="submit">+</button>
      </form>
      <div className={styles.todo_list}>
        {todos.map((_, i) => (<TodoComponent key={i} id={i} />))}
      </div>
    </main>
  )
}