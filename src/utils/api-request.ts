import { ContentCheckerProps, EditorContentOutputProps } from '@/interface';
import { OutputData } from '@editorjs/editorjs';
import axios from 'axios';
import { escapeDoubleQuotes } from './function';

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
      'https://light-gold.cmd.outerbase.io/main'
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

export const CommonPathProps = async (table: string) => {
  try {
    const { data } = await axios.get(
      `https://light-gold.cmd.outerbase.io/data/slug?table=${table}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getDataBySlug = async (table: string, slug: string) => {
  try {
    const { data } = await axios.get(
      `https://light-gold.cmd.outerbase.io/table/slug?table=${table}&slug=${slug}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getAllArticles = async () => {
  try {
    const { data } = await axios.get(
      `https://light-gold.cmd.outerbase.io/artices`
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const updateContent = async (table:string, content: string, id:number) => {
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
const createContent = async (table:string, content: string, id:number) => {
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

const contentIdChecker = async (table:string, contentId: number) => {
  try {
    const { data } = await axios.get<ContentCheckerProps>(
      `https://minimum-aqua.cmd.outerbase.io/content/check?table=${table}&id=${contentId}`
    );
    return data.response.items[0].exists;
  } catch (error) {
    console.log(error);
  }
};

export const createOrUpdateContent = async (contentId: number, content: OutputData, table:string) => {
  const isContentIdPresent = await contentIdChecker(table, contentId);
  const stringifyContent = JSON.stringify({ ...content });
  if (typeof isContentIdPresent === 'boolean' && isContentIdPresent) {
    return await updateContent(table, stringifyContent, contentId);
  } else {
    return await createContent(table, stringifyContent, contentId);
  }
};

export const getContent = async (table:string, id:number): Promise<OutputData | undefined> => {
  try {
    const { data } = await axios.get<EditorContentOutputProps>(`https://minimum-aqua.cmd.outerbase.io/content?table=${table}&id=${id}`);
    if (data.success) {
      const doesContentExist = data.response.items[0]?.editorcontentoutput;
      if (doesContentExist) {
        const content = JSON.parse(doesContentExist) as OutputData;     
        console.log('content', content);
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


export const getImageURL = async (file: File) => {
  console.log(file)
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<{ url: string }>(
      `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL_GENERATOR!}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('response.data.url',response.data.url)
    return response.data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error
  }
};
