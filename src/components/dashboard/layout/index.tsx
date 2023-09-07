import React from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = (props: Props) => {
  return (
    <main className='w-full h-screen overflow-y-hidden'>
      <Navbar />
      <section className='w-full flex'>
        <Sidebar />
        <section className='w-full h-[90vh] overwrite-sticky flex-1 p-4'>
          {props.children}
        </section>
      </section>
    </main>
  );
};

export default DashboardLayout;
