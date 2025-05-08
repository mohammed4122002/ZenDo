"use client";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import { getTodosAction } from "@/actions/todo.actions";
import AddTodoForm from "@/components/AddTodoForm";
import ToDoTable from "@/components/ToDoTable";


export default function Home() {

  return (
    <main className="container">
      {/*<Button variant={"secondary"}><Plus size={14}/>New ToDo</Button> */}

      {/*
      {todos.map((todo) => (
        <div key={todo.id} className="flex flex-col gap-2 border-b py-4">
          <h2 className="text-2xl font-bold">{todo.title}</h2>
          <p className="text-sm text-muted-foreground">{todo.body}</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Edit
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>
      ))}
      */}

     <AddTodoForm/>
     <ToDoTable/>
    </main>
  );

}