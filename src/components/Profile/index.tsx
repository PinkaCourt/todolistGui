import { Component, Show } from "solid-js";
import { unwrap } from "solid-js/store";
import { state } from "common/store";
import styles from "./styles.module.scss";

const Profile: Component = () => {
  const getInitials = (name: string) => {
    if (!name || !name.trim()) return "??";

    const initials = name.match(/(?<=^|\s)\S/g)?.join("");

    return initials ? initials.slice(0, 2).toUpperCase() : "??";
  };

  console.log("user", unwrap(state.user)); //todo! for test

  return (
    <Show when={state.user}>
      <div class={styles.userWidget}>
        <span class={styles.userName}>{state.user?.name}</span>

        <div class={styles.userAvatar}>{getInitials(state.user!.name)}</div>
      </div>
    </Show>
  );
};

export default Profile;
