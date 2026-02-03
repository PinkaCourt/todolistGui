import { Component } from "solid-js";
import { toggleTodo, removeTodo } from "common/store";
import { Todo } from "common/types";
import styles from "./styles.module.scss";

interface TaskItemProps {
  task: Todo;
}

const TaskItem: Component<TaskItemProps> = (props) => {
  const handleToggle = () => {
    toggleTodo(props.task.id, !props.task.isComplete);
  };

  const handleDelete = () => {
    removeTodo(props.task.id);
  };

  return (
    <li class={styles.taskItem}>
      <input
        type="checkbox"
        checked={props.task.isComplete}
        onChange={handleToggle}
        class={styles.checkbox}
      />
      <span
        class={styles.taskText}
        classList={{ [styles.completed]: props.task.isComplete }}
      >
        {props.task.name}
      </span>
      <button onClick={handleDelete} class={styles.deleteButton}>
        Удалить
      </button>
    </li>
  );
};

export default TaskItem;
