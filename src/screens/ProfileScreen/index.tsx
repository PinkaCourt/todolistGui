import { Component, Show } from "solid-js";
import { state, setScreen } from "common/store";
import { ScreenType } from "common/types";
import { getTranslatedText } from "common/textUtils";
import styles from "./styles.module.scss";

const ProfileScreen: Component = () => {
  return (
    <div class={styles.screenContainer}>
      <button
        class={styles.backButton}
        onClick={() => setScreen(ScreenType.TodoList)}
      >
        ← {getTranslatedText("backToList")}
      </button>

      <div class={styles.card}>
        <h2 class={styles.title}>👤 {getTranslatedText("profileTitle")}</h2>

        <Show
          when={state.user}
          fallback={
            <div class={styles.loading}>{getTranslatedText("loadingData")}</div>
          }
        >
          <div class={styles.row}>
            <span class={styles.label}>{getTranslatedText("idLabel")}</span>
            <span class={styles.code}>{state.user?.id}</span>
          </div>

          <div class={styles.row}>
            <span class={styles.label}>{getTranslatedText("nameLabel")}</span>
            <span class={styles.value}>{state.user?.name}</span>
          </div>

          <div class={styles.row}>
            <span class={styles.label}>{getTranslatedText("loginLabel")}</span>
            <span class={styles.value}>@{state.user?.login}</span>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default ProfileScreen;
