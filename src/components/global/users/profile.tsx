import { User } from '@/interface';
// import { Session } from 'next-auth'; Will check later
import { useSession } from 'next-auth/react';
import React from 'react';
import Avatar from 'react-avatar';

const UserProfile = () => {
  const { data: session } = useSession();

  const user = { ...session?.user } as User;
  return (
    <Avatar
      name={user.name}
      size='40'
      src={user.image}
      className='w-full h-full object-cover object-center'
      round={true}
    />
  );
};

export default UserProfile;
