import { getTodosAction } from "@/actions/todo.actions";
import AddTodoForm from "@/components/AddTodoForm";
import ToDoTable from "@/components/ToDoTable";

export default async function Home() {
  const todos = await getTodosAction();
  return (
    <main className="container">
      <AddTodoForm />
      <ToDoTable todos={todos} />
    </main>
  );
}
