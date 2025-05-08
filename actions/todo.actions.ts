"use server";

import ITodo from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
  revalidatePath("/")
  return todo;
};





export const deleteTodoAction = async (id: string) => {

  await prisma.todo.delete({
    where: {
      id,
    },
  });
  revalidatePath("/")



};




export const updateTodoAction = async ( {id , title , body , completed ,createdAt}: ITodo) => {

 
      await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      completed
    },
  });
  revalidatePath("/")
};
