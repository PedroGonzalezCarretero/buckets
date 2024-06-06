"use server";

import { db } from "@/db";
import { bucketList, InsertBucketList } from "@/schema";
import { eq } from "drizzle-orm";

export const getBucketLists = async () => {
  try {
    const data = await db.select().from(bucketList);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getBucketListById = async (id: number) => {
  try {
    const data = await db
      .select()
      .from(bucketList)
      .where(eq(bucketList.id, id))
      .limit(1);
    return data[0];
  } catch (error) {
    console.log(error);
  }
};

export const createBucketList = async (data: InsertBucketList) => {
  try {
    const result = await db.insert(bucketList).values(data);
    return {
      data: result,
      message: "Bucket list created successfully",
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Error creating bucket list",
      ok: false,
    };
  }
};
