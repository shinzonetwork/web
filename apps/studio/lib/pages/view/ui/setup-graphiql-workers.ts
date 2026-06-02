import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker.js?worker";
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker.js?worker";
import GraphQLWorker from "monaco-graphql/esm/graphql.worker.js?worker";

type MonacoEnvironment = {
  getWorker: (workerId: string, label: string) => Worker;
};

const globalWithMonaco = globalThis as typeof globalThis & {
  MonacoEnvironment?: MonacoEnvironment;
};

globalWithMonaco.MonacoEnvironment = {
  getWorker(_workerId, label) {
    if (label === "json") {
      return new JsonWorker();
    }

    if (label === "graphql") {
      return new GraphQLWorker();
    }

    return new EditorWorker();
  },
};
