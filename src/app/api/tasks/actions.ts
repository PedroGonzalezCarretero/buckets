"use server";

import { db } from "@/db";
import { tasks, InsertTask } from "@/schema";
import { eq } from "drizzle-orm";

export const getTasksByBucketId = async (id: number) => {
  // 3 seconds delay
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const data = await db
      .select()
      .from(tasks)
      .where(eq(tasks.bucketListId, id));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (data: InsertTask) => {
  try {
    const result = await db.insert(tasks).values(data);
    return {
      data: result,
      message: "Task created successfully",
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Error creating task",
      ok: false,
    };
  }
};
