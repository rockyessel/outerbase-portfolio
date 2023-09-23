export const initArticleValue = {
  id: '',
  image: '',
  title: '',
  content: '',
  slug: '',
  description: '',
  caption: '',
  tags: '',
  keywords: '',
  audio_url: '',
  published_datetime: '',
  also_published_on: '',
  is_comment_disabled: false,
  user_id: '',
  portfolio_id: '',
  seen_count: 0,
  comments_count: 0,
  liked_count: 0,
  is_published: false,
  word_count: 0,
  character_count: 0,
  reading_minutes: 1,
};
export const initProjectValue = {
  id: '',
  image: '',// Array of images
  title: '',
  content: '',
  slug: '',
  description: '',
  caption: '',
  tags: '',
  keywords: '',
  audio_url: '',
  published_datetime: '',
  is_comment_disabled: false,
  article_id: '', // referencing an article
  user_id: '', // referencing a user
  portfolio_id: '',// referencing a portfolio
  seen_count: 0,
  comments_count: 0,
  liked_count: 0,
  is_published: false,
  word_count: 0,
  character_count: 0,
  reading_minutes: 1,
  technologies:''
};

export const articleTableHeaders = [
  'Title',
  'Status',
  'View Count',
  'Comments Disabled',
  'Comments',
  'Audio',
  'Edit',
];
