"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createBucketList } from "../../app/api/bucket_lists/actions";

import { z } from "zod";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { createTask } from "@/app/api/tasks/actions";

interface Props {
  bucketId: number;
}

const NewTaskForm = ({ bucketId }: Props) => {
  const formSchema = z.object({
    description: z.string().min(2, {
      message: "Task name must be at least 2 characters.",
    }),
    completed: z.boolean().optional(),
    bucketListId: z.number(),
    assignedTo: z.number(),
    created_at: z.date().optional(),
    updated_at: z.date().nullable().optional(),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      completed: false,
      bucketListId: bucketId,
      assignedTo: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await createTask(values);

      if (!res.ok) {
        throw new Error("Failed to create bucket");
      }

      window.location.href = "/buckets";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Task</DialogTitle>
      </DialogHeader>
      {/* <DialogDescription>
            <p>Fill in the form below to create a new restaurant.</p>
         </DialogDescription> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Description"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                {/* <FormDescription>
                                    
                                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormMessage />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default NewTaskForm;
