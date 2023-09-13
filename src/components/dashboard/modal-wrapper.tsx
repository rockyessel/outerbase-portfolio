import React, { useState } from 'react';
import Image from 'next/image';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import TextEditor from './global/text-editor';
import { createOrUpdateContent } from '@/utils/api-request';
import { OutputData } from '@editorjs/editorjs';
import SeoDrawer from './global/seo-drawer';

interface Props {
  children: React.ReactNode;
  buttonName: string;
}

const ModalWrapper = (props: Props) => {
  const [isWrapperModalOpened, setIsWrapperModalOpened] = useState(false);

  const openModal = () => setIsWrapperModalOpened(true);
  const closeModal = () => setIsWrapperModalOpened(false);

  return (
    <main>
      <button
        type='button'
        title='Open Modal'
        onClick={openModal}
        className='inline-flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
      >
        <HiOutlinePlusCircle />
        <span>{props.buttonName}</span>
      </button>
      {isWrapperModalOpened && (
        <div className='fixed inset-0 z-50 w-full'>
          <div className='absolute inset-0 bg-[#0e141b] w-full' />
          <div className='relative w-full h-screen overflow-y-auto flex'>
            {props.children}
          </div>
        </div>
      )}
    </main>
  );
};

export default ModalWrapper;
// <p className='text-sm'>
//   Use{' '}
//   <kbd className='rounded-md border text-white bg-muted px-1 text-xs uppercase'>
//     Tab
//   </kbd>{' '}
//   to open the command menu.
// </p>;
