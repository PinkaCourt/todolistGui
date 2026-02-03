import { createStore } from "solid-js/store";
import { Todo, User, ScreenType } from "./types";
import * as api from "./api";

interface State {
  screen: ScreenType;
  user: User | null;
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}

const [state, setState] = createStore<State>({
  screen: ScreenType.TodoList,
  user: null,
  todos: [],
  isLoading: false,
  error: null,
});

const setScreen = (type: ScreenType) => {
  setState("screen", type);
};

const loadData = async () => {
  setState({ isLoading: true, error: null });
  try {
    const [user, todos] = await Promise.all([api.getUser(), api.getTodos()]);

    setState({ user, todos, isLoading: false });
  } catch (err) {
    setState({ error: "Ошибка загрузки", isLoading: false });
  }
};

const addTodo = async (name: string) => {
  try {
    const updatedList = await api.create(name);
    setState("todos", updatedList);
  } catch (err) {
    console.error(err);
  }
};

const toggleTodo = async (id: string, isComplete: boolean) => {
  try {
    const updatedList = await api.update({ id, isComplete });
    setState("todos", updatedList);
  } catch (err) {
    console.error(err);
  }
};

const removeTodo = async (id: string) => {
  try {
    const updatedList = await api.remove(id);
    setState("todos", updatedList);
  } catch (err) {
    console.error(err);
  }
};

export { state, setScreen, loadData, addTodo, toggleTodo, removeTodo };
