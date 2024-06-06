import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { SelectUser } from '@/schema';

type Props = {
   users: SelectUser[];
};

const UsersTable = (props: Props) => {
   return (
      <Card x-chunk='dashboard-01-chunk-5'>
         <CardHeader>
            <CardTitle>All Users</CardTitle>
         </CardHeader>
         <CardContent className='grid gap-8'>
            {props.users.map((user) => {
               return (
                  <div className='flex items-center gap-4' key={user.id}>
                     <Avatar className='hidden h-9 w-9 sm:flex'>
                        <AvatarImage src={user.image || ''} alt='Avatar' />
                        <AvatarFallback>OM</AvatarFallback>
                     </Avatar>
                     <div className='grid gap-1'>
                        <p className='text-sm font-medium leading-none'>
                           {user.name}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                           {user.email}
                        </p>
                     </div>
                     <div className='ml-auto font-medium'>{user.email}</div>
                  </div>
               );
            })}
         </CardContent>
      </Card>
   );
};

export default UsersTable;
