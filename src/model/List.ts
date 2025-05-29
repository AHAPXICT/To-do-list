import {Todo} from "./Todo.ts";

export class List {
    public completedNotesCount: number = 0;
    public failedNotesCount: number = 0;

    constructor (
        public notes: Array<Todo>,
        public date: Date,
        private isPassed: boolean = Date.now() >= date.getTime()
    ) {}
}
