import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TodoId = string;
export type Todo = {
    id: TodoId;
    text: string;
    isDone: boolean;
    timeStart: Date | null,
    timeEnd: Date | null,
}

export type ListId = string
export type TodoList = {
    id: ListId,
    todos: Record<TodoId, Todo>,
    date: Date,
    isPassed: boolean
}

type TodosState = {
    lists: Record<ListId, TodoList>;
    ids: ListId[];
    selectedListId: ListId | undefined;
};

// export const initialUsersList: User[] = Array.from(
//   { length: 3000 },
//   (_, index) => ({
//     id: `user${index + 11}`,
//     name: `User ${index + 11}`,
//     description: `Description for User ${index + 11}`,
//   })
// );

const initialTodosState: TodosState = {
    lists: {},
    ids: [],
    selectedListId: undefined,
};

export const todosSlice = createSlice({
    name: "todoLists",
    initialState: initialTodosState,
    selectors: {
        selectSelectedUserId: (state) => state.selectedListId,
        // selectSortedUsers: createSelector(
        //   (state: UsersState) => state.ids,
        //   (state: UsersState) => state.entities,
        //   (_: UsersState, sort: "asc" | "desc") => sort,
        //   (ids, entities, sort) =>
        //     ids
        //       .map((id) => entities[id])
        //       .sort((a, b) => {
        //         if (sort === "asc") {
        //           return a.name.localeCompare(b.name);
        //         } else {
        //           return b.name.localeCompare(a.name);
        //         }
        //       })
        // ),
        // selectTodo: (state) => createSelector(
        //
        // )
    },
    reducers: {
        selected: (state, action: PayloadAction<{ userId: UserId }>) => {
            state.selectedListId = action.payload.userId;
        },
        // stored: (state, action: PayloadAction<{ users: User[] }>) => {
        //     const {users} = action.payload;
        //
        //     state.entities = users.reduce((acc, user) => {
        //         acc[user.id] = user;
        //         return acc;
        //     }, {} as Record<UserId, User>);
        //     state.ids = users.map((user) => user.id);
        // },
        newTodo: (state, action: PayloadAction<{ todo: Todo }>) => {
            state.entities[action.payload.todo.id] = action.payload.todo;
        }
    },
});