"use client";

import React from "react";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";
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
import { createTodoAction } from "@/actions/todo.actions";
import { todoFormSchema } from "@/schema";

import { Checkbox } from "@/components/ui/checkbox";

const AddTodoForm = () => {
  // This can come from your database or API.
  const defaultValues: Partial<todoFormValues> = {
    title: "",
    body: "",
    completed: false,
  };

  type todoFormValues = z.infer<typeof todoFormSchema>;

  const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const handleSubmit = async (data: todoFormValues) => {
    console.log("form data", data);

    await createTodoAction({ title: data.title, body: data.body ,completed:data.completed});
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus size={14} />
          New ToDo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new ToDo</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
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

              <Button type="submit">Save changes</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoForm;
