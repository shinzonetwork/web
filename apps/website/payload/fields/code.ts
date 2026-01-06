import type { Block } from "payload";

export const Code: Block = {
  slug: "code",
  interfaceName: "CodeBlock",
  fields: [
    {
      name: "language",
      type: "select",
      defaultValue: "bash",
      options: [
        {
          label: "Plaintext / None",
          value: "text",
        },
        {
          label: "Arduino",
          value: "arduino",
        },
        {
          label: "Bash",
          value: "bash",
        },
        {
          label: "C",
          value: "c",
        },
        {
          label: "C#",
          value: "csharp",
        },
        {
          label: "C++",
          value: "cpp",
        },
        {
          label: "Docker",
          value: "docker",
        },
        {
          label: "Git",
          value: "git",
        },
        {
          label: "Go",
          value: "go",
        },
        {
          label: "Graphql",
          value: "graphql",
        },
        {
          label: "Java",
          value: "java",
        },
        {
          label: "Javascript",
          value: "javascript",
        },
        {
          label: "JSON",
          value: "json",
        },
        {
          label: "JSX",
          value: "jsx",
        },
        {
          label: "Kotlin",
          value: "kotlin",
        },
        {
          label: "LaTeX",
          value: "latex",
        },
        {
          label: "Log file",
          value: "log",
        },
        {
          label: "Makefile",
          value: "makefile",
        },
        {
          label: "Markdown",
          value: "markdown",
        },
        {
          label: "Markup",
          value: "markup",
        },
        {
          label: "Mermaid",
          value: "mermaid",
        },
        {
          label: "MongoDB",
          value: "mongodb",
        },
        {
          label: "Objective-C",
          value: "objectivec",
        },
        {
          label: "Php",
          value: "php",
        },
        {
          label: "Python",
          value: "python",
        },
        {
          label: "Ruby",
          value: "ruby",
        },
        {
          label: "Rust",
          value: "rust",
        },
        {
          label: "Scala",
          value: "scala",
        },
        {
          label: "SQL",
          value: "sql",
        },
        {
          label: "Swift",
          value: "swift",
        },
        {
          label: "TSX",
          value: "tsx",
        },
        {
          label: "Typescript",
          value: "typescript",
        },
        {
          label: "Yaml",
          value: "yaml",
        },
        {
          label: "Zig",
          value: "zig",
        },
      ],
    },
    {
      name: "code",
      type: "code",
      label: false,
      required: true,
    },
  ],
};
