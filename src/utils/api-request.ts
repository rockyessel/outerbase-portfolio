import {
  ArticleItem,
  CommentProps,
  ContentCheckerProps,
  EditorContentOutputProps,
  PaginationResponse,
  SlugResponse,
} from '@/interface';
import { OutputData } from '@editorjs/editorjs';
import axios from 'axios';
import serialize from 'serialize-javascript';

export const deserialize = (serializedJavascript: string) => {
  try {
    return eval('(' + serializedJavascript + ')');
  } catch (error) {
    console.error('Error deserializing data:', error);
    return undefined;
  }
};

export const SendContactForm = async (data: any) => {
  try {
    await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const AddViewCount = async (_id: string) => {
  try {
    const res = await fetch('/api/add-view-count', {
      method: 'POST',
      body: JSON.stringify({ _id }),
    });
    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const AddComment = async (commentObj: any) => {
  try {
    const res = await fetch('/api/add-comment', {
      method: 'POST',
      body: JSON.stringify(commentObj),
    });

    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getMainContentHero = async () => {
  try {
    const { data } = await axios.get(
      'https://minimum-aqua.cmd.outerbase.io/components/main-hero'
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getAllSideProjects = async () => {
  try {
    const { data } = await axios.get(
      'https://light-gold.cmd.outerbase.io/projects/side-project'
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getAllProfessionalProjects = async () => {
  try {
    const { data } = await axios.get(
      'https://light-gold.cmd.outerbase.io/projects/prefessional'
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllProjects = async () => {
  try {
    const { data } = await axios.get(
      'https://light-gold.cmd.outerbase.io/projects/all'
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getArticleBySlug = async (slug: string) => {
  const { data } = await axios.get(
    `https://minimum-aqua.cmd.outerbase.io/data/slug?slug=${slug}`
  );
  const article = data.response?.items?.[0];

  return article;
};

export const getAllArticlesSlugs = async () => {
  const { data } = await axios.get(
    `https://minimum-aqua.cmd.outerbase.io/data/all/slug`
  );
  return data;
};

export const CommonPathProps = async (table: string) => {
  try {
    const { data } = await axios.get(
      `https://minimum-aqua.cmd.outerbase.io/data/all/slug?table=${table}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getDataBySlug = async (table: string, slug: string) => {
  const { data } = await axios.get(
    `https://minimum-aqua.cmd.outerbase.io/data/slug?table=${table}&slug=${slug}`
  );
  const article = data.response?.items?.[0];

  return article;
};

export const getAllArticles = async (pageOffset: number = 0) => {
  try {
    const { data } = await axios.get(
      `https://minimum-aqua.cmd.outerbase.io/articles/all?pageOffset=${pageOffset}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const updateContent = async (table: string, content: string, id: number) => {
  try {
    const response = await fetch(
      `https://minimum-aqua.cmd.outerbase.io/content/update?table=${table}&id=${id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: content,
      }
    );

    const data = response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log();
  }
};
const createContent = async (table: string, content: string, id: number) => {
  try {
    const response = await fetch(
      `https://minimum-aqua.cmd.outerbase.io/content/create?table=${table}&id=${id}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: content,
      }
    );

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const contentIdChecker = async (table: string, contentId: number) => {
  try {
    const { data } = await axios.get<ContentCheckerProps>(
      `https://minimum-aqua.cmd.outerbase.io/content/check?table=${table}&id=${contentId}`
    );
    return data.response.items[0].exists;
  } catch (error) {
    console.log(error);
  }
};

export const createOrUpdateContent = async (
  contentId: number,
  content: OutputData,
  table: string
) => {
  const isContentIdPresent = await contentIdChecker(table, contentId);
  const serializedData = serialize({ ...content });
  const base64 = encodeObjectToBase64(serializedData);
  if (typeof isContentIdPresent === 'boolean' && isContentIdPresent) {
    return await updateContent(table, base64, contentId);
  } else {
    return await createContent(table, base64, contentId);
  }
};

export const getContent = async (
  table: string,
  id: number
): Promise<OutputData | undefined> => {
  try {
    const { data } = await axios.get<EditorContentOutputProps>(
      `https://minimum-aqua.cmd.outerbase.io/content?table=${table}&id=${id}`
    );
    if (data.success) {
      const doesContentExist = data.response.items[0]?.editorcontentoutput;
      // console.log('doesContentExist', doesContentExist);
      if (doesContentExist) {
        const json = decodeBase64ToObject(doesContentExist);
        const content = deserialize(json);
        // console.log('content', content);
        // console.log('json', json);
        if (content) {
          return content;
        }
      }
    }
  } catch (error) {
    console.error('Error fetching content:', error);
  }
  return undefined;
};

export const getImageURL = async (files: File[]) => {
  try {
    const formData = new FormData();

    // Append each file separately
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    const response = await axios.post<{ urls: string[] }>(
      `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL_GENERATOR!}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('response.data.urls', response.data.urls);
    return response.data.urls; // Assuming the backend returns an array of URLs for each uploaded file
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

// Encode a JavaScript object as Base64
export const encodeObjectToBase64 = (obj: any) => {
  const json = JSON.stringify(obj);
  const utf8Bytes = new TextEncoder().encode(json);
  const utf8Array = Array.from(utf8Bytes);

  const base64 = btoa(String.fromCharCode.apply(null, utf8Array));
  return base64;
};

// Decode a Base64-encoded string back to a JavaScript object
export const decodeBase64ToObject = (base64: string) => {
  const binaryString = atob(base64);
  const utf8Bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    utf8Bytes[i] = binaryString.charCodeAt(i);
  }
  const json = new TextDecoder().decode(utf8Bytes);
  const obj = JSON.parse(json);
  return obj;
};

export const createArticle = async (articleData: ArticleItem) => {
  try {
    console.log('createArticle', { ...articleData });
    const { data } = await axios.post(
      `https://minimum-aqua.cmd.outerbase.io/article/create`,
      { ...articleData }
    );
    return data.response.items[0].exists;
  } catch (error) {
    console.log(error);
  }
};

export const getArticlePagination = async () => {
  try {
    const { data } = await axios.get<PaginationResponse>(
      'https://minimum-aqua.cmd.outerbase.io/pages?table=public.articles'
    );
    return data.response.items?.[0].total_pages;
  } catch (error) {
    console.log(error);
  }
};

export const updateArticle = async (articleData: ArticleItem, id: string) => {
  try {
    const response = await fetch(
      `https://minimum-aqua.cmd.outerbase.io/article/update?id=${id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ ...articleData }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (comment: CommentProps) => {
  try {
    const { data } = await axios.post(
      `https://minimum-aqua.cmd.outerbase.io/comments/create`,
      { ...comment }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
