import ModalWrapper from '@/components/dashboard/modal-wrapper';
import DashboardLayout from '@/components/dashboard/layout';
import Table from '@/components/dashboard/articles/table';
import React, { RefObject } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdArrowBack } from 'react-icons/md';
import { IoMdArrowForward } from 'react-icons/io';
import { ArticleItem, ArticleResponse } from '@/interface';
import {
  createArticle,
  encodeObjectToBase64,
  getAllArticles,
  getArticlePagination,
} from '@/utils/api-request';
import TextEditor from '@/components/dashboard/global/text-editor';
import MetaDataDrawer from '@/components/dashboard/global/metadata-drawer';
import { OutputData } from '@editorjs/editorjs';
import serialize from 'serialize-javascript';
import { IdGen, getTextFromEditorContent } from '@/utils/function';

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

const DashboardArticles = () => {
  const [view, setView] = React.useState('all');
  const [showMetaDataDrawer, setShowMetaDataDrawer] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);
  const [totalPages, setTotalPages] = React.useState<number>();
  const [activePage, setActivePage] = React.useState<number>(0);
  const [pageNumLimit, setPageNumLimit] = React.useState(1);
  const [articles, setArticles] = React.useState<ArticleResponse>();
  const [articleMetaData, setArticleMetaData] = React.useState<ArticleItem>(init);
  const [articleContent, setArticleContent] = React.useState<OutputData>();
  const [totalCharacters, setTotalCharacters] = React.useState<number>(0);
  const [totalWords, setTotalWords] = React.useState<number>(0);

  React.useEffect(() => {
    getArticlePagination().then((pageNumber) => setTotalPages(pageNumber));
  });

  React.useEffect(() => {
    getAllArticles(activePage).then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, [activePage]);

  const handleReset = () => setArticleMetaData(init);

  const tablesHeaders = [
    'Title',
    'Status',
    'View Count',
    'Comments Disabled',
    'Comments',
    'Audio',
    'Edit',
  ];

  const handleSubmission = async (type: string) => {
    if (articleContent && articleMetaData) {
      const serializedArticleContent = serialize(articleContent);
      articleMetaData.content = encodeObjectToBase64(serializedArticleContent);
    }
    const wordsPerMinute = 200;
    const totalReadingMinutes = Math.ceil(totalWords / wordsPerMinute);
    articleMetaData.word_count = totalWords;
    articleMetaData.character_count = totalCharacters;
    articleMetaData.reading_minutes = totalReadingMinutes;
    articleMetaData.id = IdGen('ARTICLE');

    // Make sure there's no empty string inn articleContent
    const isContentAdded = articleMetaData.content.length > 10; // Denoting that content is not empty.;

    switch (type) {
      case 'draft':
        if (isContentAdded) createArticle(articleMetaData);
        console.log('articleMetaData', articleMetaData);
        break;
      case 'publish':
        articleMetaData.is_published = true;
        console.log('articleMetaData', articleMetaData);
        if (isContentAdded) createArticle(articleMetaData);
        break;
      default:
        console.log('article handleSubmission invalid type.');
        break;
    }
  };

  const handlePagination = (type: 'next' | 'previous') => {
    if (type === 'next' && pageNumLimit < totalPages!) {
      setActivePage((prevActivePage) => prevActivePage + 10);
      setPageNumLimit((prevPageNumLimit) => prevPageNumLimit + 1);
    } else if (type === 'previous' && pageNumLimit > 1) {
      setActivePage((prevActivePage) => prevActivePage - 10);
      setPageNumLimit((prevPageNumLimit) => prevPageNumLimit - 1);
    }
  };

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
    console.log('plainText: ', plainText);
    setTotalCharacters(plainText.length);
    setTotalWords(plainText.split(' ').length);
  }, [articleContent]);

  const allItems = articles?.response?.items;
  let filteredItems: ArticleItem[] | undefined = [];

  if (view === 'published') {
    filteredItems = allItems!.filter((item) => item.is_published === true);
  } else if (view === 'unpublished') {
    filteredItems = allItems?.filter((item) => item.is_published === false);
  } else {
    filteredItems = allItems;
  }

  return (
    <DashboardLayout>
      <div>
        <section className='container px-4 mx-auto'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <div>
              <div className='flex items-center gap-x-3'>
                <h2 className='text-lg font-medium'>Articles</h2>
                <span className='px-3 py-1 text-xs bg-rose-700 rounded-full'>
                  {filteredItems?.length} lists
                </span>
              </div>
            </div>

            <div className='flex items-center mt-4 gap-x-3'>
              <ModalWrapper buttonName='Create Article'>
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
                    oldContent={undefined}
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
                        Publish Article
                      </button>
                    </div>

                    <div className='inline-flex items-center gap-2'>
                      <p>Characters: {totalCharacters}</p>
                      <p>Words: {totalCharacters === 0 ? 0 : totalWords}</p>
                    </div>
                  </section>
                )}
              </ModalWrapper>
            </div>
          </div>

          <div className='mt-6 md:flex md:items-center md:justify-between'>
            <div className='inline-flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse'>
              <button
                type='button'
                title='View All'
                onClick={() => setView('all')}
                className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                  view === 'all' ? ' bg-gray-100' : ''
                }`}
              >
                View all
              </button>

              <button
                type='button'
                title='Published'
                className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                  view === 'published' ? 'bg-gray-100' : ''
                }`}
                onClick={() => setView('published')}
              >
                Published
              </button>

              <button
                type='button'
                title='Not Published'
                className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                  view === 'unpublished' ? 'bg-gray-100' : ''
                }`}
                onClick={() => setView('unpublished')}
              >
                Not Published
              </button>
            </div>

            <div className='relative flex items-center mt-4 md:mt-0'>
              <span className='absolute'>
                <AiOutlineSearch className='w-5 h-5 mx-3 text-gray-400' />
              </span>
              <input
                type='text'
                placeholder='Search'
                className='block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </div>
          </div>

          <div className='flex flex-col mt-6'>
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='overflow-hidden'>
                  <Table
                    headers={tablesHeaders}
                    loading={loading}
                    data={filteredItems}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 sm:flex sm:items-center sm:justify-between '>
            <div className='text-sm'>
              Page{' '}
              <span className='font-medium text-gray-200'>
                {activePage / 10 + 1} of {totalPages}
              </span>
            </div>

            <div className='flex items-center mt-4 gap-x-4 sm:mt-0'>
              <button
                type='button'
                title='Previous'
                onClick={() => handlePagination('previous')}
                className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700   ${
                  pageNumLimit === 1 ? 'cursor-not-allowed' : ''
                }`}
              >
                <MdArrowBack />
                <span>previous</span>
              </button>

              <button
                type='button'
                title='Next'
                onClick={() => handlePagination('next')}
                className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700 ${
                  pageNumLimit === totalPages! ? 'cursor-not-allowed' : ''
                }`}
              >
                <span>Next</span>
                <IoMdArrowForward />
              </button>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DashboardArticles;
