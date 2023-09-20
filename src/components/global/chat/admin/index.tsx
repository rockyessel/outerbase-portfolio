import React from 'react';
import ChatBox from '../box';
import ChatUsersList from '../users-list';
import ChatHead from '../head';
import ChatBody from '../body';
import { dummyChatHistory } from '..';

const AdminChat = () => {
  const [minimize, setMinimize] = React.useState('450');
  const [selectedUser, setSelectedUser] = React.useState<any>();
  const [chatHistory, setChatHistory] = React.useState<any[]>(dummyChatHistory);
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
          <ChatBody selectedUser={selectedUser} chatHistory={chatHistory} />
        ) : (
          <ChatUsersList setSelectedUser={setSelectedUser} />
        )}
      </ChatBox>
    </div>
  );
};

export default AdminChat;
