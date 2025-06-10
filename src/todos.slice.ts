import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";

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
    ids: ListId[];
    selectedListId: ListId;
    selectedListDate: ListDate;
};

const nowDate = new Date().setUTCHours(0, 0, 0, 0);

const initialTodosState: TodosState = {
    lists: {0: {id: 0, date: nowDate, todos: []}},
    ids: [],
    selectedListId: 0,
    selectedListDate: nowDate
};
const selectedId = (state: TodosState) => state.selectedListId;
const lists = (state: TodosState) => state.lists;

export const todosSlice = createSlice({
    name: "todos",
    initialState: initialTodosState,
    selectors: {
        selectSelectedListId: (state: TodosState) => state.selectedListId,
        selectSelectListDate: (state: TodosState) => state.selectedListDate,
        // selectTodos: (state) => Object.values(state.lists[state.selectedListId].todos),
        selectTodos: createSelector(
            [lists, selectedId],
            (lists, selectedId) => Object.values(lists[selectedId]?.todos)),
        selectTodo: createSelector(
            [lists, selectedId, (_: TodosState, todoId: TodoId) => todoId],
            (lists, selectedId, id) => lists[selectedId]?.todos[id]
        )
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
        }

    },
});