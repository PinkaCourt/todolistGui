import { Component, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { state, loadData } from "common/store";
import Screen from "components/Screen";
import "./App.scss";

const App: Component = () => {
  onMount(() => {
    loadData();
  });

  return (
    <div class="main-layout">
      <Screen type={state.screen} />

      <Show when={state.isLoading}>
        <div class="global-loader">Загрузка...</div>
      </Show>

      {/* <Portal mount={document.getElementById("portal-root")!}>
        <ErrorModal />
      </Portal> */}
    </div>
  );
};

export default App;
