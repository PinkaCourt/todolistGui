import { Component, Show } from "solid-js";
import { state, setScreen } from "common/store";
import { ScreenType } from "common/types";
import styles from "./styles.module.scss";

const ProfileScreen: Component = () => {
  return (
    <div class={styles.screenContainer}>
      <button
        class={styles.backButton}
        onClick={() => setScreen(ScreenType.TodoList)}
      >
        ← Назад к списку
      </button>

      <div class={styles.card}>
        <h2 class={styles.title}>👤 Личный кабинет</h2>

        <Show
          when={state.user}
          fallback={<div class={styles.loading}>Загрузка данных...</div>}
        >
          <div class={styles.row}>
            <span class={styles.label}>ID:</span>
            <span class={styles.code}>{state.user?.id}</span>
          </div>

          <div class={styles.row}>
            <span class={styles.label}>Имя:</span>
            <span class={styles.value}>{state.user?.name}</span>
          </div>

          <div class={styles.row}>
            <span class={styles.label}>Логин:</span>
            <span class={styles.value}>@{state.user?.login}</span>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default ProfileScreen;
