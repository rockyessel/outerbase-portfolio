import React, { useState } from 'react';
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs';

interface Props {
  minimizeValue: string;
  setMinimizeValue: React.Dispatch<React.SetStateAction<string>>;
}

const ChatHead = (props: Props) => {
  const [status, setStatus] = useState<'Live' | 'Message'>('Message');
  return (
    <div className='w-full border-b-[1px] flex items-center justify-between px-4 py-3.5 text-black'>
      <span className='font-bold'>{status}</span>

      <span className='cursor-pointer'>
        {props.minimizeValue === '50' ? (
          <BsChevronDoubleUp onClick={() => props.setMinimizeValue('450')} />
        ) : (
          <BsChevronDoubleDown onClick={() => props.setMinimizeValue('50')} />
        )}
      </span>
    </div>
  );
};

export default ChatHead;
