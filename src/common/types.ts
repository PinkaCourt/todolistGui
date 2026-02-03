export interface User {
  id: string;
  name: string;
  login: string;
}

export interface Todo {
  id: string;
  name: string;
  isComplete: boolean;
  timeCreate: number;
  timeDone: number | null;
}

export interface CreateTodoPayload {
  name: string;
}

export interface UpdateTodoPayload {
  id: string;
  name?: string;
  isComplete?: boolean;
}

export enum ScreenType {
  TodoList = "todoList",
  Profile = "profile",
}
