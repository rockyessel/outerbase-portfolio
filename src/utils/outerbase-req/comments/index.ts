import axios from 'axios';
import { findArticleIdBySlug } from '../articles';

export const getArticleComments = async (articleId: string) => {
  //   const articleId = await findArticleIdBySlug(slug);
  const { data } = await axios.get(
    `https://minimum-aqua.cmd.outerbase.io/comments/cr?articleId=${articleId}`
  );
  if (data.success) return data.response.items;
};
