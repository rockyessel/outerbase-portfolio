import { CommentProps } from '@/interface';
import { IdGen } from '@/utils/function';
import { createComment, createReply } from '@/utils/outerbase-req/comments';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  type: string;
  articleId: string;
  parentCommentId: string | undefined;
  style: string | undefined;
}

const CreateCommentInput = (props: Props) => {
  const [commentContent, setCommentContent] = React.useState('');
  const router = useRouter();

  const handleSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    let obj: CommentProps;

    try {
      if (props.type === 'create') {
        const commentId = IdGen('comment');
        obj = {
          reply_id: '',
          comment_id: commentId,
          article_id: props.articleId,
          user_id: 'User 1',
          content: commentContent,
          parent_comment_id: '',
          created_at: new Date().toISOString(),
        };

        await createComment(obj);
      }

      if (props.type === 'reply') {
        const replyId = IdGen('reply');
        obj = {
          comment_id: '',
          reply_id: replyId,
          article_id: props.articleId,
          user_id: 'User 1',
          content: commentContent,
          parent_comment_id: props.parentCommentId,
          created_at: new Date().toISOString(),
        };

        await createReply(obj);
      }

      router.replace(router.asPath);
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmission} className='mt-1 w-full mb-6'>
      <div
        className={`py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-rose-200 ${
          props.style ? props.style : ''
        }`}
      >
        <label className='sr-only'>Your comment</label>
        <textarea
          id='comment'
          className='px-0 w-full text-sm text-rose-900 border-0 focus:ring-0 focus:outline-none'
          placeholder='Write a comment...'
          required
          value={commentContent}
          onChange={(event) => setCommentContent(event.target.value)}
        ></textarea>
      </div>
      <button
        type='submit'
        className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-rose-700 border-[1px] border-opacity-50 border-rose-700 rounded-lg focus:ring-4 focus:ring-primary-200'
      >
        Post comment
      </button>
    </form>
  );
};

export default CreateCommentInput;
