import axios from 'axios';

export const findArticleIdBySlug = async (slug: string) => {
  const { data } = await axios.get(
    `https://minimum-aqua.cmd.outerbase.io/articles/id?slug=${slug}`
  );

  return data.response.items?.[0]?.id;
};

export const increaseArticleViewCount = async (articleId: string) => {
  const { data } = await axios.get(
    `https://minimum-aqua.cmd.outerbase.io/articles/views-count?articleId=${articleId}`
  );
  return data.success;
};

export const getArticleSeenCount = async (articleId: string) => {
  const { data } = await axios.get(
    `https://minimum-aqua.cmd.outerbase.io/article/seen-count?articleId=${articleId}`
  );
  return data.response.items?.[0].seen_count;
};

export const updateCommentOnLoad = async (articleId: string) => {
  const { data } = await axios.get(
    `https://minimum-aqua.cmd.outerbase.io/comments/counts?articleId=${articleId}`
  );
  return data.success;
};
