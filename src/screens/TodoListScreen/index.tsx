import { Component, createSignal, For } from "solid-js";
import { state, setScreen, addTodo } from "common/store";
import { ScreenType } from "common/types";
import TaskItem from "components/TaskItem";
import ProfileWidget from "components/Profile";
import styles from "./styles.module.scss";

const TodoListScreen: Component = () => {
  const [taskName, setTaskName] = createSignal("");
  const [openInput, setOpenInput] = createSignal(false);

  const handleAdd = () => {
    if (taskName().trim()) {
      addTodo(taskName());
      setTaskName("");
      setOpenInput(false);
    }
  };

  const handleAddNew = () => {
    setOpenInput(true);
  };

  return (
    <div class={styles.container}>
      <header class={styles.header}>
        <h1>TO DO List</h1>
        <div onClick={() => setScreen(ScreenType.Profile)}>
          <ProfileWidget />
        </div>
      </header>

      <main class={styles.main}>
        <ul class={styles.list}>
          <For each={state.todos}>{(todo) => <TaskItem task={todo} />}</For>
          {openInput() && (
            <input
              class={styles.input}
              value={taskName()}
              onInput={(e) => setTaskName(e.currentTarget.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="To do"
            />
          )}
        </ul>
      </main>
      <footer class={styles.controls}>
        <button class={styles.addButton} onClick={handleAddNew}>
          +
        </button>
      </footer>
    </div>
  );
};
export default TodoListScreen;
