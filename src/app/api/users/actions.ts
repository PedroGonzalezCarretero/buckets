'use server';

import { db } from '@/db';
import { users } from '@/schema';

const getUsers = async () => {
   try {
      const data = await db.select().from(users);
      return data;
   } catch (error) {
      console.log(error);
   }
};

export default getUsers;
