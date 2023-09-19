import React from 'react';
import { BsEmojiLaughing } from 'react-icons/bs';
import ChatMessage from './message';
import UserChat from './user';

interface Props {
  chatHistory: any[];
}

const ChatBody = (props: Props) => {
  return (
    <div className='flex-1 flex flex-col gap-2 p-4 overflow-y-auto bg-white'>
      {props.chatHistory.map((chatObject, index) => (
        <div key={index}>
          <UserChat
            userId={chatObject.userId}
            timestamp={chatObject.timestamp}
          />
          <ChatMessage message={chatObject.message} />
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
