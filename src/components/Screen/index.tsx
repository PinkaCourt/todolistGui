import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import { ScreenType } from "common/types";

import TodoListScreen from "screens/TodoListScreen";
import ProfileScreen from "screens/ProfileScreen";

const screenMap = {
  [ScreenType.TodoList]: TodoListScreen,
  [ScreenType.Profile]: ProfileScreen,
};

interface ScreenProps {
  type: ScreenType;
}

const Screen: Component<ScreenProps> = (props) => {
  return <Dynamic component={screenMap[props.type]} />;
};
export default Screen;
