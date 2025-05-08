"use client";

import React from "react";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import { deleteTodoAction } from "@/actions/todo.actions";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import EditTodoForm from "./EditTodoForm";
import ITodo from "@/interfaces";

const ToDoTableActions = ({ todo}: { todo: ITodo }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <EditTodoForm todo={todo} />

      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={async () => {
          setLoading(true);
          await deleteTodoAction(todo.id);
          setLoading(false);
        }}
      >
        {loading ? <Spinner /> : <Trash size={16} />}
      </Button>
    </>
  );
};

export default ToDoTableActions;
