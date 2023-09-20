import React from 'react';
import CommentSystemRender from './render';
import CommentSystemSelector from './selector';
import { CommentProps } from '@/interface';

interface Props {
  commentHistory: CommentProps[];
  articleId: string;
}

const CommentEngineWrapper = (props: Props) => {
  const [commentSystem, setCommentSystem] = React.useState('Internal');
  return (
    <section>
      <CommentSystemSelector setCommentSystem={setCommentSystem} />
      <CommentSystemRender
        articleId={props.articleId}
        commentHistory={props.commentHistory}
        systemType={commentSystem}
      />
    </section>
  );
};

export default CommentEngineWrapper;
