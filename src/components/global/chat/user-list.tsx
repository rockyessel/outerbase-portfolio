import React from 'react';

interface Props {
  user: any;
  handleUserSelection: (user: any) => void;
}

const ChatUserList = (props: Props) => {
  console.log(props);

  props.handleUserSelection(props.user);
  return <div className='cursor-pointer'>User List</div>;
};

export default ChatUserList;
