import React from 'react';
import DisqusCommentsEngine from './external/disqus';
import MainComment from './internal/comment';
import { CommentProps } from '@/interface';

interface Props {
  systemType: string;
  commentHistory: CommentProps[];
  articleId: string;
}

const CommentSystemRender = (props: Props) => {
  switch (props.systemType) {
    case 'Internal':
      return (
        <MainComment
          articleId={props.articleId}
          commentHistory={props.commentHistory}
        />
      );

    default:
      return <DisqusCommentsEngine />;
  }
};

export default CommentSystemRender;
