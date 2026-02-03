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

      server.create("todo", {
        id: "123",
        name: "что-то сделать",
        isComplete: false,
        timeCreate: twoDaysAgo + getRandomOffset(),
        timeDone: null,
      });

      server.create("todo", {
        id: "100",
        name: "сделано",
        isComplete: true,
        timeCreate: twoDaysAgo + getRandomOffset(),
        timeDone: oneDayAgo + getRandomOffset(),
      });

      server.create("todo", {
        id: "124",
        name: "qwerty",
        isComplete: false,
        timeCreate: twoDaysAgo + getRandomOffset(),
        timeDone: null,
      });
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
