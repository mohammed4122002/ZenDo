"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";

import { Pen, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTodoAction, updateTodoAction } from "@/actions/todo.actions";
import { todoFormSchema } from "@/schema";
import Spinner from "@/components/Spinner"
import { Checkbox } from "@/components/ui/checkbox";
import ITodo from "@/interfaces";

const EditTodoForm = ({todo}: {todo:ITodo}) => {
  // This can come from your database or API.
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const defaultValues: Partial<todoFormValues> = {
    title:todo.title,
    body:todo.body as string,
    completed:todo.completed,
  };

  type todoFormValues = z.infer<typeof todoFormSchema>;

  const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const handleSubmit = async (data: todoFormValues) => {
  
    setLoading(true);

   await updateTodoAction({id:todo.id , body :data.body , title : data.title , completed: data.completed , createdAt:todo.createdAt});
    setLoading(false);
   
    setOpen(false);
    

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild>
        <Button>
        <Pen size={16} />
         
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>

          <DialogTitle>Edit this ToDo</DialogTitle>
    
        </DialogHeader>
        <div className="py-2 space-y-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>title</FormLabel>
                    <FormControl>
                      <Input placeholder="go to gym" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>short Descriptions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox  checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel> completed</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit"> 
                {loading ? <><Spinner/> saving </>:"Save"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoForm;
