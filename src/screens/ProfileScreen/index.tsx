import { Component, Show } from "solid-js";
import { state, setScreen } from "common/store";
import { ScreenType } from "common/types";
import { getTranslatedText } from "common/textUtils";
import Image from "components/Image";
import styles from "./styles.module.scss";

const ProfileScreen: Component = () => {
  return (
    <div class={styles.screenContainer}>
      <header class={styles.header}>
        <Image
          name="chevronLeft"
          class={styles.backButton}
          onClick={() => setScreen(ScreenType.TodoList)}
        />

        <h2 class={styles.title}>{getTranslatedText("profileTitle")}</h2>
      </header>

      <main class={styles.card}>
        <Show
          when={state.user}
          fallback={
            <div class={styles.loading}>{getTranslatedText("loadingData")}</div>
          }
        >
          <div class={styles.row}>
            <span class={styles.label}>{getTranslatedText("nameLabel")}</span>
            <span class={styles.value}>{state.user?.name}</span>
          </div>

          <div class={styles.row}>
            <span class={styles.label}>{getTranslatedText("loginLabel")}</span>
            <span class={styles.value}>{state.user?.login}</span>
          </div>
        </Show>
      </main>
    </div>
  );
};

export default ProfileScreen;
