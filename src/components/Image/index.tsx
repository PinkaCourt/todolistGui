import { Component, JSX, splitProps, Show } from "solid-js";
import files from "./files";

export interface Props extends JSX.ImgHTMLAttributes<HTMLImageElement> {
  name: keyof typeof files;
}

const Image: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["name"]);

  return (
    <Show when={files[local.name]}>
      <img alt="" src={files[local.name]} {...others} />
    </Show>
  );
};

export default Image;
