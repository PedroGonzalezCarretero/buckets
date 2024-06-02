import { db } from './db';
import * as schema from './schema';

async function seed() {
   await db.insert(schema.usersTable).values([
      {
         name: 'Jonas Curto',
         email: 'jonas.curto@example.com',
         image: 'jonas.jpg',
         emailVerified: null
      },
      {
         name: 'Francisco Godoy',
         email: 'francisco.godoy@example.com',
         image: 'francisco.jpg',
         emailVerified: null
      }
   ]);
}

async function main() {
   try {
      await seed();
      console.log('Seeding completed');
   } catch (error) {
      console.error('Error during seeding:', error);
      process.exit(1);
   }
}

main();
