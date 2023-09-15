import React, { useState } from 'react';
import Image from 'next/image';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import TextEditor from './global/text-editor';
import { createOrUpdateContent } from '@/utils/api-request';
import { OutputData } from '@editorjs/editorjs';
import SeoDrawer from './global/metadata-drawer';

interface Props {
  children: React.ReactNode;
  buttonName: string;
}

const ModalWrapper = (props: Props) => {
  const [isWrapperModalOpened, setIsWrapperModalOpened] = useState(false);

  const openWrapperModal = () => setIsWrapperModalOpened(true);
  const closeWrapperModal = () => setIsWrapperModalOpened(false);

  return (
    <main>
      <button
        type='button'
        title='Open Modal'
        onClick={openWrapperModal}
        className='inline-flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
      >
        <HiOutlinePlusCircle />
        <span>{props.buttonName}</span>
      </button>
      {isWrapperModalOpened && (
        <div className='fixed inset-0 z-50 w-full force-overflow-hidden'>
          <div className='absolute inset-0 bg-[#0e141b] w-full' />
          <div className='relative w-full h-screen overflow-y-auto flex flex-col'>
            {props.children}
          </div>
          <button
            type='button'
            title='Close Modal'
            onClick={closeWrapperModal}
            className='fixed top-0 right-0 inline-flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
          >
           X
            <span>Close Modal</span>
          </button>
        </div>
      )}
    </main>
  );
};

export default ModalWrapper;
