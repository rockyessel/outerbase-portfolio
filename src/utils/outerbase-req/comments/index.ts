import axios from 'axios';
import { findArticleIdBySlug } from '../articles';

export const createComment = async (comment: any) => {
  const { data } = await axios.post(
    'https://minimum-aqua.cmd.outerbase.io/comments/create',
    { ...comment }
  );

  if (data.success) return data.success;
};

export const createReply = async (reply: any) => {
  const { data } = await axios.post(
    'https://minimum-aqua.cmd.outerbase.io/comments/replies',
    { ...reply }
  );

  if (data.success) return data.success;
};

// Function to fetch article replies
export const getArticleReplies = async (articleId: string) => {
  try {
    const { data } = await axios.get(
      `https://minimum-aqua.cmd.outerbase.io/comments/article-replies?article_id=${articleId}`
    );
    if (data.success) return data.response.items;
    return [];
  } catch (error) {
    console.error('Error fetching article replies:', error);
    return [];
  }
};

// Function to fetch article comments
export const getArticleComments = async (articleId: string) => {
  try {
    const { data } = await axios.get(
      `https://minimum-aqua.cmd.outerbase.io/comments/all/only?articleId=${articleId}`
    );
    if (data.success) return data.response.items;
    return [];
  } catch (error) {
    console.error('Error fetching article comments:', error);
    return [];
  }
};

// interface CommentProps {
//   comment_id: string;
//   article_id: string;
//   user_id: string;
//   content: string;
//   parent_comment_id: string;
//   created_at: string;
//   replies: ReplyProps[];
// }[]

// interface ReplyProps {
//   reply_id: string;
//   article_id: string;
//   user_id: string;
//   content: string;
//   parent_comment_id: string;
//   created_at: string;
// }
// Function to format comments and replies
// Function to format comments and replies with sorting
export const getFormatCommentsAndReplies = async (articleId: string) => {
  const replies = await getArticleReplies(articleId);
  const comments = await getArticleComments(articleId);

  console.log('replies: ', replies);
  console.log('comments: ', comments);

  if (comments && replies) {
    // Create a data structure to organize comments and their replies
    const structuredData = comments.map((comment) => ({
      comment_id: comment.comment_id,
      article_id: comment.article_id,
      user_id: comment.user_id,
      content: comment.content,
      parent_comment_id: comment.parent_comment_id,
      created_at: comment.created_at,
      replies: replies
        .filter((reply) => reply.parent_comment_id === comment.comment_id)
        .map((reply) => ({
          reply_id: reply.reply_id,
          article_id: reply.article_id,
          user_id: reply.user_id,
          content: reply.content,
          parent_comment_id: reply.parent_comment_id,
          created_at: reply.created_at,
        }))
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)), // Sort replies by created_at
    }));

    // Sort comments by created_at
    structuredData.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    return structuredData;
  }
};
