"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodosAction = async () => {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return todos;
};


export const createTodoAction = async ({title , body , completed} :  {title: string ;body?: string | undefined , completed:boolean}) => {
 

  const todo = await prisma.todo.create({
    data: {
      title,
      body,
      completed
    },
  });
  return todo;
};





export const deleteTodoAction = async (id: string) => {

  const todo = await prisma.todo.delete({
    where: {
      id,
    },
  });
  return todo;
};
export const updateTodoAction = async (data: FormData) => {

  const id = data.get("id")?.toString() || "";
  const title = data.get("title")?.toString() || "";
  const body = data.get("body")?.toString() || "";
  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      body,
    },
  });
  return todo;
};
