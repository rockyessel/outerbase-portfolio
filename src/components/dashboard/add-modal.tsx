'use client';

import React, { useState } from 'react';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import Image from 'next/image';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { AiOutlineSearch } from 'react-icons/ai';
import TextEditor from './global/text-editor';
import { createOrUpdateContent } from '@/utils/api-request';
import { OutputData } from '@editorjs/editorjs';
import SeoDrawer from './global/seo-drawer';

function ImportModal() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [textEditorContentAbout, setTextEditorContentAbout] =
    React.useState<OutputData>();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsImportModalOpen(true);
  };

  const closeModal = () => {
    setIsImportModalOpen(false);
  };
  const handleSaveContent = async () => {
    if (textEditorContentAbout) {
      await createOrUpdateContent(
        1,
        textEditorContentAbout,
        'public.about_dev'
      );
    }
  };

  return (
    <div>
      <button
        title='Modal'
        onClick={openModal}
        className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
      >
        <HiOutlinePlusCircle />
        <span>Add Project</span>
      </button>
      {isImportModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='absolute inset-0 bg-[#0e141b]' />
          <div className='text-white font-moldyen p-8 rounded-lg z-10 w-full h-full flex items-center gap-2'>
            <form className='w-full h-screen overflow-y-auto flex-1'>
              <div className='sticky top-0 left-0 z-[20] w-full p-4 bg-[rgba(0,0,0,1)] shadow md:flex md:items-center md:justify-between md:p-6'>
                <p className='text-sm'>
                  Use{' '}
                  <kbd className='rounded-md border text-white bg-muted px-1 text-xs uppercase'>
                    Tab
                  </kbd>{' '}
                  to open the command menu.
                </p>
                <div className='flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0'>
                  <button
                    className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
                    onClick={handleSaveContent}
                  >
                    Save
                  </button>

                  <button onClick={closeModal}>Public</button>
                  <button onClick={closeModal}>Close</button>
                </div>
              </div>
              <TextEditor
                oldContent={undefined}
                value={textEditorContentAbout}
                set={setTextEditorContentAbout}
              />
            </form>
            <div className='overflow overflow-y-scroll'>

            <SeoDrawer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImportModal;
