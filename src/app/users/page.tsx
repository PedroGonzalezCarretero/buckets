export const revalidate = 0;
export const dynamic = 'force-dynamic';

import UsersTable from '@/components/users/users-table';
import getUsers from '../api/users/actions';

type Props = {};

const page = async (props: Props) => {
   const users = await getUsers();

   console.log(users);
   if (!users) return <div>No se encontraron usuarios.</div>;
   return (
      <div>
         <UsersTable users={users} />
      </div>
   );
};

export default page;
