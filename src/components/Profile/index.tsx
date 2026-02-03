import { Component, Show } from "solid-js";
import { state } from "common/store";
import styles from "./styles.module.scss";

const Profile: Component = () => {
  const getInitials = (login: string) =>
    login ? login.slice(0, 2).toUpperCase() : "??";

  return (
    <Show when={state.user}>
      <div class={styles.userWidget}>
        <span class={styles.userName}>{state.user?.name}</span>

        <div class={styles.userAvatar}>{getInitials(state.user!.login)}</div>
      </div>
    </Show>
  );
};

export default Profile;
