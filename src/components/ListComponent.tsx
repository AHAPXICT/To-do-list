import TodoComponent from "./TodoComponent.tsx";
import {useRef, useState} from "react";
import styles from "../css/List.module.css"
import styles2 from "../css/Todo.module.css"

export default function ListComponent() {
  const [todos, setTodos] = useState(['SampleComponent']);
  const [todoName, setTodoName] = useState("");
  const textInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (todoName.length < 1) {
      console.log(null, 'Enter note header')
      return;
    }

    setTodos([...todos, todoName])
    setTodoName("")
    textInputRef.current?.focus()
  }

  return (
    <main className={styles.main}>
      <h2>List</h2>
      <form className={styles.add_todo_main} onSubmit={handleSubmit}>
        <div className={styles2.todo}>
          <input ref={textInputRef}
                 className={`${styles.add_todo_text} ${styles.todo_input}`}
                 type='text' value={todoName} placeholder="Enter To-Do name"
                 onChange={(e) => setTodoName(e.target.value)} />
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
        {todos.map((s, key) => (<TodoComponent key={key} todoText={s} id={key} />))}
      </div>
    </main>
  )
}