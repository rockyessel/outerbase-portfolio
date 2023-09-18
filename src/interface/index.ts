import React from 'react';
import { ParsedUrlQuery } from 'querystring';

export interface DefaultMetaDataProps {
  description: string;
  title: string;
  image: string;
  type: string;
  alt: string;
  keywords: string;
  publishedAt: string;
  updatedAt: string;
  MIME: string;
  author_name: string;
}

export interface HeaderProps {
  props: DefaultMetaDataProps;
}

export interface MetaInfoTagsProps {
  name: string;
  content: string;
}

export interface LayoutProps {
  children: React.ReactNode;
  description: string;
  title: string;
  image: string;
  type: string;
  alt: string;
  keywords: string;
  publishedAt: string;
  updatedAt: string;
  MIME: string;
  author_name: string;
}

export interface CommonPath {
  success: boolean;
  response: {
    count: number;
    items: {
      slug: string;
    }[];
  };
}

export interface FormDataProps {
  name: string;
  email: string;
  message: string;
}

export interface FormErrorProps {
  state: boolean;
  msg: string;
}

interface CommentFormDataProps {
  name: string;
  profile: string;
  email: string;
  comment: string;
  _id: string;
}

interface THOUGHT_ID_PROPS {
  url: string;
  _id: string;
  close: () => void;
}

export interface Params extends ParsedUrlQuery {
  article: string;
}

export interface ApiResponse {
  success: boolean;
  response: {
    count: number;
    items: WebDeveloper[];
  };
}

export interface WebDeveloper {
  created_at: string;
  description: string;
  email: string;
  github: string;
  id: string | null;
  linkedin: string;
  sub_title: string;
  title: string;
  tools: string;
  x: string;
}

export interface ProjectResponse {
  success: boolean;
  response: {
    count: number;
    items: ProjectItem[];
  };
}

export interface ProjectItem {
  description: string;
  short_description: string;
  slug: string;
  id: number;
  live_url: string;
  main_image: string;
  name: string;
  other_image: string;
  project_type: string;
  source_code: string;
  tags: string;
}

export interface SlugResponse {
  success: boolean;
  response: {
    count: number;
    items: ArticleItem[];
  };
}
export interface ArticleResponse {
  success: boolean;
  response: {
    count: number;
    items: ArticleItem[];
  };
}
export interface PaginationResponse {
  success: boolean;
  response: {
    count: number;
    items: { total_pages: number }[];
  };
}

export interface ArticleItem {
  id: string;
  image: string;
  title: string;
  content: string;
  slug: string;
  description: string;
  caption: string;
  tags: string;
  keywords: string;
  published_datetime: string;
  also_published_on: string;
  is_comment_disabled: boolean;
  user_id: string;
  portfolio_id: string;
  seen_count: number;
  comments_count: number;
  liked_count: number;
  is_published: boolean;
  word_count: number;
  character_count: number;
  reading_minutes: number;
}

export interface Block {
  id: string;
  type: string;
  data: {
    text: string;
  };
}

export interface EditorDataProps {
  time: number;
  version: string;
  blocks: Block[];
}

export interface ContentCheckerProps {
  success: boolean;
  response: {
    items: {
      exists: boolean;
    }[];
    schema: boolean;
  };
}

export interface EditorContentProps {
  editorcontentoutput: string;
}

export interface EditorContentOutputProps {
  success: boolean;
  response: {
    items: EditorContentProps[];
    schema: boolean;
  };
}


export interface CommentProps {
  comment_id: string;
  content: string;
  article_id: string;
  user_id: string;
  parent_comment_id: string;
  replies: {
    comment_id: string;
    content: string;
    article_id: string;
    user_id: string;
    parent_comment_id: string;
  }[];
}