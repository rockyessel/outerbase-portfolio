'use client';

import React, { useState } from 'react';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import Image from 'next/image';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { AiOutlineSearch } from 'react-icons/ai';

function ImportModal() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const options = [
    { value: 'rust', label: 'Rust', image: '/rust.png' },
    { value: 'option2', label: 'Option 2', image: '/rust.png' },
    { value: 'option3', label: 'Option 3', image: '/rust.png' },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [isOpen, setIsOpen] = useState(false);
  const [packageName, setPackageName] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const selected = options.find((option) => option.value === selectedOption);

  const openModal = () => {
    setIsImportModalOpen(true);
  };

  const closeModal = () => {
    setIsImportModalOpen(false);
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
          <div className='absolute inset-0 bg-black opacity-50'></div>
          <div className='bg-[#0e141b] text-white font-moldyen p-8 rounded-lg z-10 w-[50rem]'>
            <form className='w-full'>
              <fieldset>
                <p className='w-full text-lg'>Add Project</p>
              </fieldset>


              <fieldset className='m-0 p-0'>
                <label>Project Name:</label>
                <fieldset className='relative flex items-center mt-4 md:mt-0'>
                  <span className='absolute'>
                    <MdOutlineDriveFileRenameOutline className='w-5 h-5 mx-3 text-gray-400' />
                  </span>

                  <input
                    type='text'
                    placeholder='Type something...eg, How State Management Works'
                    className='block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
          </fieldset>
          
              <fieldset className='m-0 p-0'>
                <label>Project Name:</label>
                <fieldset className='relative flex items-center mt-4 md:mt-0'>
                  <span className='absolute'>
                    <MdOutlineDriveFileRenameOutline className='w-5 h-5 mx-3 text-gray-400' />
                  </span>

                  <input
                    type='text'
                    placeholder='Type something...eg, How State Management Works'
                    className='block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
          </fieldset>
          
              <fieldset className='m-0 p-0'>
                <label>Project Name:</label>
                <fieldset className='relative flex items-center mt-4 md:mt-0'>
                  <span className='absolute'>
                    <MdOutlineDriveFileRenameOutline className='w-5 h-5 mx-3 text-gray-400' />
                  </span>

                  <input
                    type='text'
                    placeholder='Type something...eg, How State Management Works'
                    className='block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
          </fieldset>
          
              <fieldset className='m-0 p-0'>
                <label>Project Name:</label>
                <fieldset className='relative flex items-center mt-4 md:mt-0'>
                  <span className='absolute'>
                    <MdOutlineDriveFileRenameOutline className='w-5 h-5 mx-3 text-gray-400' />
                  </span>

                  <input
                    type='text'
                    placeholder='Type something...eg, How State Management Works'
                    className='block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
          </fieldset>
          
              <fieldset className='m-0 p-0'>
                <label>Project Name:</label>
                <fieldset className='relative flex items-center mt-4 md:mt-0'>
                  <span className='absolute'>
                    <MdOutlineDriveFileRenameOutline className='w-5 h-5 mx-3 text-gray-400' />
                  </span>

                  <input
                    type='text'
                    placeholder='Type something...eg, How State Management Works'
                    className='block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
          </fieldset>
          
              <fieldset className='m-0 p-0'>
                <label>Project Name:</label>
                <fieldset className='relative flex items-center mt-4 md:mt-0'>
                  <span className='absolute'>
                    <MdOutlineDriveFileRenameOutline className='w-5 h-5 mx-3 text-gray-400' />
                  </span>

                  <input
                    type='text'
                    placeholder='Type something...eg, How State Management Works'
                    className='block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
          </fieldset>
          
              <fieldset className='m-0 p-0'>
                <label>Project Name:</label>
                <fieldset className='relative flex items-center mt-4 md:mt-0'>
                  <span className='absolute'>
                    <MdOutlineDriveFileRenameOutline className='w-5 h-5 mx-3 text-gray-400' />
                  </span>

                  <input
                    type='text'
                    placeholder='Type something...eg, How State Management Works'
                    className='block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
          </fieldset>
          
              <fieldset className='m-0 p-0'>
                <label>Project Name:</label>
                <fieldset className='relative flex items-center mt-4 md:mt-0'>
                  <span className='absolute'>
                    <MdOutlineDriveFileRenameOutline className='w-5 h-5 mx-3 text-gray-400' />
                  </span>

                  <input
                    type='text'
                    placeholder='Type something...eg, How State Management Works'
                    className='block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImportModal;
