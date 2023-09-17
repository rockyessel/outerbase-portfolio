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
  articles: string;
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
  slug: string;
  description: string;
  caption: string;
  content: string;
  tags: string;
  keywords: string;
  publishedDatetime: string;
  alsoPublishedAt: string;
  isCommentDisabled: boolean;
  userId: string;
  portfolioId?: string;
  seenCount: number;
  commentsCount: number;
  likedCount: number;
  isPublished: boolean;
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
