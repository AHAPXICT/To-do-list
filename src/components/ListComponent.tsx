import TodoComponent from "./TodoComponent.tsx";
import styles from "../css/List.module.css"
import styles2 from "../css/Todo.module.css"
import {useAppDispatch, useAppSelector} from "../model/store.ts";
import {Todo, todosSlice} from "../model/todos.slice.ts";
import {FieldValues, useForm} from "react-hook-form";

let todo: Todo

export default function ListComponent() {
    const dispatch = useAppDispatch()

    const todos = useAppSelector(todosSlice.selectors.selectTodos)
    const id = useAppSelector(todosSlice.selectors.selectLastTodoId) + 1

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        setFocus,
        getValues,
    } = useForm();

    function handleSubmitF(data: FieldValues) {
        todo = {id: id, text: data.todoText, isDone: false, timeStart: data.timeStart, timeEnd: data.timeEnd}
        dispatch(todosSlice.actions.newTodo({todo: todo}))
        setValue("todoText", "")
        setFocus("todoText")
    }

    function validateTime(value: string): string | boolean {
        const timeS = getValues("timeStart").split(":")
        const timeE = value.split(":")

        const timeStart = Number(timeS[0]) * 60 + Number(timeS[1])
        const timeEnd = Number(timeE[0]) * 60 + Number(timeE[1])

        if (isNaN(timeStart) || isNaN(timeEnd)) {
            return true
        }
        return timeStart <= timeEnd ? true : "timeStart can't be more than timeEnd"
    }

    return (
        <main className={styles.main}>
            <h2>List</h2>
            <form className={styles.add_todo_main} onSubmit={handleSubmit((data) => handleSubmitF(data))}>
                <div className={styles2.todo}>
                    <input {...register("todoText", {
                        required: {value: true, message: "To-do text can't be empty"},
                        maxLength: {value: 256, message: "Max length of to-do text is 256"},
                    })}
                           className={`${styles.add_todo_text} ${styles.todo_input}`}
                           type='text'
                           placeholder="Enter To-Do text"
                           spellCheck="true"
                    />
                    <div className={styles2.time_container}>
                        <input {...register("timeStart")}
                               className={`${styles.todo_input}`}
                               type='time' />
                        <input {...register("timeEnd", {validate: (value) => validateTime(value)})}
                               className={`${styles.todo_input}`}
                               type='time' />
                    </div>
                </div>
                <button className={styles.add_todo_button} type="submit">+</button>
            </form>
            <div className={styles.errors_container}>
                <span className={styles.error_message}>{errors.todoText?.message?.toString()}</span>
                <span className={styles.error_message}>{errors.timeEnd?.message?.toString()}</span>
            </div>
            <div className={styles.todo_list} >
                {todos.map((todo) => <TodoComponent key={todo.id} id={todo.id} />)}
            </div>
        </main>
    )
}