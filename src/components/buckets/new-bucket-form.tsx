'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createBucketList } from '../../app/api/bucket_lists/actions';

import { z } from 'zod';
import {
   DialogDescription,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

const NewBucketForm = () => {
   const formSchema = z.object({
      name: z.string().min(2, {
         message: 'Bucket list name must be at least 2 characters.'
      }),
      description: z.string().nullable().optional(),
      creatorId: z.number(),
      created_at: z.date().optional(),
      updated_at: z.date().nullable().optional()
   });

   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: '',
         description: '',
         creatorId: 1,
         created_at: new Date(),
         updated_at: new Date()
      }
   });

   async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
         const res = await createBucketList(values);

         if (!res.ok) {
            throw new Error('Failed to create bucket');
         }

         window.location.href = '/buckets';
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <>
         <DialogHeader>
            <DialogTitle>Create Bucket List</DialogTitle>
         </DialogHeader>
         {/* <DialogDescription>
            <p>Fill in the form below to create a new restaurant.</p>
         </DialogDescription> */}
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
               <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                           <Input
                              placeholder='Road trip'
                              {...field}
                              value={field.value || ''}
                           />
                        </FormControl>
                        {/* <FormDescription>
                                    
                                </FormDescription> */}
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                           <Input
                              placeholder='Description'
                              {...field}
                              value={field.value || ''}
                           />
                        </FormControl>
                        {/* <FormDescription>
                                    
                                </FormDescription> */}
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormMessage />
               <Button type='submit'>Submit</Button>
            </form>
         </Form>
      </>
   );
};

export default NewBucketForm;
