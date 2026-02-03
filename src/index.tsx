import { render } from "solid-js/web";
import "solid-devtools";

import App from "./App";
import makeServer from "./mocks/server";

// if (import.meta.env.DEV) {
//   makeServer({ environment: "development" });
// }

makeServer({ environment: "development" });

const root = document.getElementById("root");

if (root instanceof HTMLElement) {
  render(() => <App />, root);
}
