import React from 'react';
import {
  BsChevronDoubleDown,
  BsChevronDoubleUp,
  BsEmojiLaughing,
  BsSendPlus,
} from 'react-icons/bs';
import ChatMessage from './message';


const dummyChatHistory = [
  {
    userId: 1,
    timestamp: '2023-09-18 10:15 AM',
    message: 'Hello, how can I help you?',
  },
  {
    userId: 2,
    timestamp: '2023-09-18 10:20 AM',
    message: 'I have a question about your products.',
  },
  {
    userId: 1,
    timestamp: '2023-09-18 10:22 AM',
    message: 'Sure, feel free to ask your question.',
  },
  {
    userId: 2,
    timestamp: '2023-09-18 10:25 AM',
    message: 'Do you offer free shipping?',
  },
  {
    userId: 1,
    timestamp: '2023-09-18 10:28 AM',
    message: 'Yes, we offer free shipping on orders over $50.',
  },
  {
    userId: 2,
    timestamp: '2023-09-18 10:30 AM',
    message: 'Great, thanks for the information!',
  },
];


const Chat = () => {
  const [status, setStatus] = React.useState<'Live' | 'Message'>('Message');
  const [minimize, setMinimize] = React.useState('600');
  const [editableContent, setEditableContent] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState<any[]>(dummyChatHistory);




  const styles = {
    height: `${minimize}px`,
    transition: 'height 0.5s ease-in-out',
    transitionDelay: '0.2s',
  };

  return (
    <div className='fixed bottom-0 right-0 flex items-end h-0 text-black'>
      <div
        style={styles}
        className={`w-full md:w-[400px] border-[1px] mr-10 relative flex flex-col bottom-0 transition duration-1000 ease-out shadow-md rounded-t-lg bg-white`}
      >
        <div className='w-full border-b-[1px] flex items-center justify-between px-4 py-3.5 text-black'>
          <span className='font-bold'>{status}</span>

          <span className='cursor-pointer'>
            {minimize === '50' ? (
              <BsChevronDoubleUp onClick={() => setMinimize('600')} />
            ) : (
              <BsChevronDoubleDown onClick={() => setMinimize('50')} />
            )}
          </span>
        </div>
        <div className='flex-1 flex flex-col gap-2 p-4 overflow-y-auto bg-white'>
          {chatHistory.map((chatObject, index) => (
            <div key={index}>
              <UserChat
                userId={chatObject.userId}
                timestamp={chatObject.timestamp}
              />
              <ChatMessage message={chatObject.message} />
            </div>
          ))}
        </div>
        <div className='w-full px-4 mb-2'>
          <div className='w-full flex items-center gap-1 px-4 py-2 border-[1px] rounded-md bg-gray-50 max-h-20 relative'>
            <BsEmojiLaughing className='text-blue-500 text-xl' />
            <div
              className='min-h-[1rem] flex-1 max-h-20 w-full content-center outline-none relative overflow-y-auto'
              contentEditable
              onInput={handleContentChange}
            ></div>
            <BsSendPlus
              onClick={handleSendMessage}
              className='text-blue-500 text-xl'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
