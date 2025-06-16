import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Theme} from "./Theme.ts";

export type TodoId = number;
export type Todo = {
    id: TodoId;
    text: string;
    isDone: boolean;
    timeStart: string | null,
    timeEnd: string | null,
}

export type ListId = number
export type ListDate = number
export type TodoList = {
    id: ListId,
    todos: Record<TodoId, Todo>,
    date: ListDate,
}

type TodosState = {
    lists: Record<ListId, TodoList>;
    selectedListId: ListId;
    selectedListDate: ListDate;
};

const nowDate = new Date().setUTCHours(0, 0, 0, 0);

//Retrieve data from localStorage
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistentState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const newInitialState = {
    themeReducer: {theme: Theme.DARK}, todos: {
        lists: {0: {id: 0, date: nowDate, todos: []}},
        selectedListId: 0,
        selectedListDate: nowDate
    }
}

const localData = loadFromLocalStorage()
const initialStoreState = localData === undefined ? newInitialState : localData


// const initialTodosState: TodosState = {
//     lists: {0: {id: 0, date: nowDate, todos: []}},
//     selectedListId: 0,
//     selectedListDate: nowDate
// };

const initialTodosState: TodosState = initialStoreState.todos
//End of retrieve data

const selectedId = (state: TodosState) => state.selectedListId;
const lists = (state: TodosState) => state.lists;

export const todosSlice = createSlice({
    name: "todos",
    initialState: initialTodosState,
    selectors: {
        selectSelectedListId: (state: TodosState) => state.selectedListId,
        selectSelectListDate: (state: TodosState) => state.selectedListDate,

        selectLastTodoId: (state: TodosState) => {
            const todos = Object.values(state.lists[state.selectedListId].todos)
            if (todos.length === 0) {
                return -1;
            }
            return todos[todos.length - 1].id
        },

        selectTodos: createSelector(
            [lists, selectedId],
            (lists, selectedId) => Object.values(lists[selectedId]?.todos)),
        selectTodo: createSelector(
            [lists, selectedId, (_: TodosState, todoId: TodoId) => todoId],
            (lists, selectedId, id) => lists[selectedId]?.todos[id]
        ),
        selectTotalTodos: createSelector(
            [lists, selectedId],
            (lists, selectedId) => Object.values(lists[selectedId]?.todos).length
        ),
        selectCompletedTodos: createSelector(
            [lists, selectedId],
            (lists, selectedId) =>
                Object.values(lists[selectedId].todos).filter(todo => todo.isDone).length
        ),
    },

    reducers: {
        selected: (state, action: PayloadAction<{ listId: ListId }>) => {
            state.selectedListId = action.payload.listId;
            state.selectedListDate = state.lists[state.selectedListId].date;
        },
        newList: (state, action: PayloadAction<{ listId: ListId, date: ListDate }>) => {
            state.lists[action.payload.listId] = {id: action.payload.listId, todos: [], date: action.payload.date};
        },
        newTodo: (state, action: PayloadAction<{ todo: Todo }>) => {
            state.lists[state.selectedListId].todos[action.payload.todo.id] = action.payload.todo;
        },
        switchIsDone: (state, action: PayloadAction<{ todoId: TodoId }>) => {
            state.lists[state.selectedListId].todos[action.payload.todoId].isDone = !state.lists[state.selectedListId].todos[action.payload.todoId].isDone
        },
        deleteTodo: (state, action: PayloadAction<{ todoId: TodoId }>) => {
            const { [action.payload.todoId]: _, ...newRecords } = state.lists[state.selectedListId].todos;
            state.lists[state.selectedListId].todos = newRecords;
        }
    },
});