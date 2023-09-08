import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe('chat');

    channel.bind('message', (data: { message: string }) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      channel.unbind('message');
      pusher.unsubscribe('chat');
    };
  }, []);

  const sendMessage = async () => {
    try {
      await axios.post('/api/send-message', { message: newMessage });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      Hello
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        title='fdsdfsdf'
        type='text'
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
