import MetaDataDrawer from '@/components/dashboard/global/metadata-drawer';
import TextEditor from '@/components/dashboard/global/text-editor';
import { ArticleItem, ArticleResponse } from '@/interface';
import {
  createArticle,
  decodeBase64ToObject,
  deserialize,
  encodeObjectToBase64,
  getDataBySlug,
  updateArticle,
} from '@/utils/api-request';
import { IdGen, getTextFromEditorContent } from '@/utils/function';
import { OutputData } from '@editorjs/editorjs';
import { useRouter } from 'next/router';
import React from 'react';
import serializeJavascript from 'serialize-javascript';

const init = {
  id: '',
  image: '',
  title: '',
  content: '',
  slug: '',
  description: '',
  caption: '',
  tags: '',
  keywords: '',
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

const EditContentPage = () => {
  const [editContent, setEditContent] = React.useState<OutputData>();
  const [showMetaDataDrawer, setShowMetaDataDrawer] =
    React.useState<boolean>(false);
  const [articleContent, setArticleContent] = React.useState<OutputData>();
  const [totalCharacters, setTotalCharacters] = React.useState<number>(0);
  const [totalWords, setTotalWords] = React.useState<number>(0);
  const [articleMetaData, setArticleMetaData] =
    React.useState<ArticleItem>(init);

  const router = useRouter();
  const { e, slug } = router.query;

  const handleReset = () => setArticleMetaData(init);

  const handleSubmission = async (type: string) => {
    if (articleContent && articleMetaData) {
      const serializedArticleContent = serializeJavascript(articleContent);
      articleMetaData.content = encodeObjectToBase64(serializedArticleContent);
    }

    const isContentAdded = articleMetaData.content.length > 10; // Denoting that content is not empty.;

    switch (type) {
      case 'draft':
        articleMetaData.is_published = false;
        if (isContentAdded) updateArticle(articleMetaData, articleMetaData.id);
        console.log('handleSubmission articleMetaData', handleSubmission);
        break;
      case 'publish':
        articleMetaData.is_published = true;
        console.log('handleSubmission articleMetaData', articleMetaData);
        if (isContentAdded) updateArticle(articleMetaData, articleMetaData.id);
        break;

      default:
        break;
    }
  };

  const table = `public.${e}`;
  React.useEffect(() => {
    getDataBySlug(table, `${slug}`).then((content) => {
      if (content) {
        console.log('content content', content);
        const editContentData = content as any;
        setArticleMetaData(content);
        const encodedContent = editContentData.content;
        const decodedContent = decodeBase64ToObject(encodedContent);
        const deserializeContent: OutputData = deserialize(decodedContent);
        setEditContent(deserializeContent);
      }
    });
  }, [slug, table]);

  const handleMetadataChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const formUpdates = {
      ...articleMetaData,
      [event.target.name]: event.target.value,
    };
    setArticleMetaData(formUpdates);
  };

  React.useEffect(() => {
    const plainText = getTextFromEditorContent(articleContent);
    setTotalCharacters(plainText.length);
    setTotalWords(plainText.split(' ').length);
  }, [articleContent, slug, table]);

  React.useEffect(() => {});
  return (
    <main className='relative w-full h-screen overflow-y-auto flex flex-col'>
      <MetaDataDrawer
        handleMetadataChange={handleMetadataChange}
        stateValue={articleMetaData}
        setStateValue={setArticleMetaData}
        setShowMetaDataDrawer={setShowMetaDataDrawer}
        showMetaDataDrawer={showMetaDataDrawer}
        handleReset={handleReset}
      />

      <section className='w-full h-screen overflow-y-auto'>
        <TextEditor
          oldContent={editContent}
          value={articleContent}
          set={setArticleContent}
        />
      </section>

      {!showMetaDataDrawer && (
        <section className='px-4 py-2 flex items-center justify-between'>
          <div>
            <button
              type='submit'
              onClick={() => handleSubmission('draft')}
              className='inline-flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-transparent border border-rose-700 rounded-md sm:w-auto gap-x-2 hover:bg-rose-700 hover:text-white hover:border-rose-700 active:ring-2 active:ring-rose-700'
            >
              Save as Draft
            </button>
            <button
              type='submit'
              onClick={() => handleSubmission('publish')}
              className='inline-flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            >
              Update
            </button>
          </div>

          <div className='inline-flex items-center gap-2'>
            <p>Characters: {totalCharacters}</p>
            <p>Words: {totalCharacters === 0 ? 0 : totalWords}</p>
          </div>
        </section>
      )}
    </main>
  );
};

export default EditContentPage;
