export const endpoints = {
  jsonPlaceholder: {
    todos: {
      one: (id: string) => `https://jsonplaceholder.typicode.com/todos/${id}`,
      all: "https://jsonplaceholder.typicode.com/todos",
    },
  },
};
