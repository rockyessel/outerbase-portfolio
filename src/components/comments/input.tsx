import { CommentProps } from '@/interface';
import { createComment } from '@/utils/api-request';
import { IdGen } from '@/utils/function';
import React from 'react';

interface Props {
  articleId: string;
  parentCommentId: string | undefined;
  style: string | undefined;
}

const CommentInput = (props: Props) => {
  const [commentContent, setCommentContent] = React.useState('');

  const handleSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const obj: CommentProps = {
        comment_id: IdGen(),
        content: commentContent,
        article_id: props.articleId,
        user_id: '',
        parent_comment_id: '',
      };

      await createComment(obj);
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmission} className='mb-6'>
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

export default CommentInput;
