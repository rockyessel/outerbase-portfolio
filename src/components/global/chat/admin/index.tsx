import React from 'react';
import ChatBox from '../box';
import ChatUsersList from '../users-list';
import ChatHead from '../head';
import ChatBody from '../body';
import ChatSendButton from '../send-button';

const dummyChatHistory = {
  1: [
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
  ],
  2: [
    {
      timestamp: '2023-09-18 10:20 AM',
      message: 'I have a question about your products.',
    },
    {
      timestamp: '2023-09-18 10:20 AM',
      message: 'I have a question about your products.',
    },
    {
      timestamp: '2023-09-18 10:20 AM',
      message: 'I have a question about your products.',
    },
  ],
  3: [
    {
      timestamp: '2023-09-18 10:22 AM',
      message: 'Sure, feel free to ask your question.',
    },
    {
      timestamp: '2023-09-18 10:22 AM',
      message: 'Sure, feel free to ask your question.',
    },
  ],
  4: [
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
    {
      timestamp: '2023-09-18 10:15 AM',
      message: 'Hello, how can I help you?',
    },
  ],
  5: [
    {
      timestamp: '2023-09-18 10:20 AM',
      message: 'I have a question about your products.',
    },
    {
      timestamp: '2023-09-18 10:20 AM',
      message: 'I have a question about your products.',
    },
    {
      timestamp: '2023-09-18 10:20 AM',
      message: 'I have a question about your products.',
    },
  ],
  6: [
    {
      timestamp: '2023-09-18 10:22 AM',
      message: 'Sure, feel free to ask your question.',
    },
    {
      timestamp: '2023-09-18 10:22 AM',
      message: 'Sure, feel free to ask your question.',
    },
    {
      timestamp: '2023-09-18 10:22 AM',
      message: 'Sure, feel free to ask your question.',
    },
  ],
};

const AdminChat = () => {
  const [minimize, setMinimize] = React.useState('450');
  const [selectedUser, setSelectedUser] = React.useState<any>();
  const [chatHistory, setChatHistory] = React.useState<any>(dummyChatHistory);
  React.useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://dummyjson.com/users');

      const data = await response.json();
      console.log(data);
    };

    fetchUser()
      .then(() => console.log('Fetch done!'))
      .catch((error) => console.log(error));
  }, []);

  console.log('selectedUser: ', selectedUser);

  return (
    <div>
      <ChatBox boxHeight={minimize}>
        <ChatHead minimizeValue={minimize} setMinimizeValue={setMinimize} />
        {selectedUser ? (
          <React.Fragment>
            <ChatBody selectedUser={selectedUser} chatHistory={chatHistory} />
            <ChatSendButton
              handleContentChange={(event) => {}}
              handleSendMessage={(event) => {}}
            />
          </React.Fragment>
        ) : (
          <ChatUsersList setSelectedUser={setSelectedUser} />
        )}
      </ChatBox>
    </div>
  );
};

export default AdminChat;
