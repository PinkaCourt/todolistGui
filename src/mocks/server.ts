import { createServer, Model, Registry } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import type Schema from "miragejs/orm/schema";
import { Todo, User } from "common/types";

const UserModel: ModelDefinition<User> = Model.extend({});
const TodoModel: ModelDefinition<Todo> = Model.extend({});

type AppRegistry = Registry<
  {
    user: typeof UserModel;
    todo: typeof TodoModel;
  },
  {}
>;
type AppSchema = Schema<AppRegistry>;

const actions = [
  "Купить молоко",
  "Погулять с собакой",
  "Написать код",
  "Позвонить маме",
  "Убраться в комнате",
  "Оплатить счета",
  "Прочитать книгу",
  "Сходить в зал",
  "Заказать пиццу",
  "Поспать",
];

export default function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    models: {
      user: UserModel,
      todo: TodoModel,
    },

    seeds(server) {
      const now = Date.now();
      const oneDayMs = 24 * 60 * 60 * 1000;

      const getRandomOffset = () =>
        Math.floor(Math.random() * (4 * 60 * 60 * 1000));

      const twoDaysAgo = now - 2 * oneDayMs;

      const oneDayAgo = now - oneDayMs;

      server.create("user", {
        id: "1",
        name: "Pinka Court",
        login: "pkionrkta",
      });

      for (let i = 0; i < 30; i++) {
        const isDone = i < 10;

        server.create("todo", {
          id: (i + 1).toString(),
          name: isDone
            ? `Выполнено: ${actions[i % actions.length]}`
            : `Сделать: ${actions[i % actions.length]}`,
          isComplete: isDone,
          timeCreate: twoDaysAgo + getRandomOffset(),
          timeDone: isDone ? oneDayAgo + getRandomOffset() : null,
        });
      }
    },

    routes() {
      this.urlPrefix = "";
      this.namespace = "";

      this.get("/user", (schema) => schema.first("user"));

      this.get("/todos", (schema) => schema.all("todo").models);

      this.post("/create", (schema: AppSchema, request) => {
        const attrs = JSON.parse(request.requestBody);

        schema.create("todo", {
          name: attrs.name,
          isComplete: false,
          timeCreate: Date.now(),
          timeDone: null,
        });

        return schema.all("todo").models;
      });

      this.post("/change", (schema: AppSchema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const id = attrs.id;
        const todo = schema.find("todo", id);

        if (todo) {
          if (attrs.isComplete === true && !todo.isComplete) {
            attrs.timeDone = Date.now();
          } else if (attrs.isComplete === false) {
            attrs.timeDone = null;
          }
          todo.update(attrs);
        }

        return schema.all("todo").models;
      });

      this.post("/delete/:id", (schema, request) => {
        const id = request.params.id;

        schema.find("todo", id)?.destroy();

        return schema.all("todo").models;
      });

      this.passthrough();
    },
  });
}
