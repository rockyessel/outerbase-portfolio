import { CommentProps } from '@/interface';
import React from 'react';
import CommentInput from './input';

interface CommentCardProps {
  comment: CommentProps; // Replace CommentProps with the actual type
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const [showCommentInput, setShowCommentInput] = React.useState(false);
  return (
    <article className='p-6 mb-3 text-base bg-white border-t border-rose-200'>
      <header className='flex justify-between items-center mb-2'>
        {/* ... (user info and dropdown menu) */}
      </header>
      <p className='text-rose-500'>{comment.content}</p>
      <div className='flex items-center mt-4 space-x-4'>
        <button
          type='button'
          onClick={() => {
            // Handle reply button click to show/hide the reply input
          }}
          className='flex items-center text-sm text-rose-500 hover:underline font-medium'
        >
          <svg
            className='mr-1.5 w-3.5 h-3.5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 18'
          >
            {/* ... (svg path) */}
          </svg>
          Reply
        </button>
      </div>

      {/* Render the CommentInput for replies */}
      {showCommentInput && (
        <CommentInput
          articleId={comment.article_id}
          parentCommentId={comment.comment_id} // Pass the comment ID as the parentCommentId
          style={undefined}
        />
      )}

      {/* Render replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className='ml-8'>
          {comment.replies.map((reply) => (
            <CommentCard key={reply.comment_id} comment={reply} />
          ))}
        </div>
      )}
    </article>
  );
};


export default CommentCard;