export const USER_URL = "/user";
export const GET_TODOS_URL = "/todos";
export const CREATE_TODO_URL = "/create";
export const CHANGE_TODO_URL = "/change";
export const getDeleteTodoUrl = (id: string) => `/delete/${id}`;

import { Todo, User, UpdateTodoPayload } from "./types";

export const getUser = async (): Promise<User> => {
  const response = await fetch(USER_URL);
  if (!response.ok) throw new Error("Auth error");
  return response.json();
};

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(GET_TODOS_URL);
  return response.json();
};

export const create = async (name: string): Promise<Todo[]> => {
  const response = await fetch(CREATE_TODO_URL, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
  return response.json();
};

export const update = async (payload: UpdateTodoPayload): Promise<Todo[]> => {
  const response = await fetch(CHANGE_TODO_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const remove = async (id: string): Promise<Todo[]> => {
  const response = await fetch(getDeleteTodoUrl(id), {
    method: "POST",
  });
  return response.json();
};
