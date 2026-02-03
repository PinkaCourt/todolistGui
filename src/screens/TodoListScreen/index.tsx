import { Component, createSignal, For } from "solid-js";
import { state, setScreen, addTodo } from "common/store";
import { ScreenType } from "common/types";
import TaskItem from "components/TaskItem";
import ProfileWidget from "components/Profile";
import styles from "./styles.module.scss";

const TodoListScreen: Component = () => {
  const [taskName, setTaskName] = createSignal("");

  const handleAdd = () => {
    if (taskName().trim()) {
      addTodo(taskName());
      setTaskName("");
    }
  };

  return (
    <div class={styles.container}>
      <header class={styles.header}>
        <h1>Мои задачи</h1>
        <div onClick={() => setScreen(ScreenType.Profile)}>
          <ProfileWidget />
        </div>
      </header>

      <main>
        <div class={styles.addSection}>
          <input
            class={styles.input}
            value={taskName()}
            onInput={(e) => setTaskName(e.currentTarget.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Новая задача..."
          />
          <button class={styles.addButton} onClick={handleAdd}>
            +
          </button>
        </div>

        <ul class={styles.list}>
          <For each={state.todos}>{(todo) => <TaskItem task={todo} />}</For>
        </ul>
      </main>
    </div>
  );
};
export default TodoListScreen;
