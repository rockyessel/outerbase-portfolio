import DashboardLayout from '@/components/dashboard/layout';
import Table from '@/components/dashboard/articles/table';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ArticleItem, ArticleResponse } from '@/interface';
import {createArticle, encodeObjectToBase64, getAllArticles, getArticlePagination } from '@/utils/api-request';
import { OutputData } from '@editorjs/editorjs';
import serialize from 'serialize-javascript';
import { IdGen, generateTextToAudioURL, getTextFromEditorContent } from '@/utils/function';
import DashboardDisplay from '@/components/dashboard/articles/create';
import ViewButtons from '@/components/dashboard/articles/view-button';
import ItemsHeader from '@/components/dashboard/articles/items-header';
import PaginateButton from '@/components/dashboard/articles/paginate-button';
import CurrentPageInfo from '@/components/dashboard/articles/current-page';
import { articleTableHeaders, initArticleValue } from '@/utils/constants/articles';
import MetaDataDrawer from '@/components/dashboard/global/metadata-drawer';





const DashboardArticles = () => {
  const [view, setView] = React.useState('all');
  const [showMetaDataDrawer, setShowMetaDataDrawer] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);
  const [totalPages, setTotalPages] = React.useState<number>();
  const [activePage, setActivePage] = React.useState<number>(0);
  const [pageNumLimit, setPageNumLimit] = React.useState(1);
  const [articles, setArticles] = React.useState<ArticleResponse>();
  const [articleMetaData, setArticleMetaData] = React.useState<ArticleItem>(initArticleValue);
  const [articleContent, setArticleContent] = React.useState<OutputData>();
  const [totalCharacters, setTotalCharacters] = React.useState<number>(0);
  const [totalWords, setTotalWords] = React.useState<number>(0);
  const [plainText, setPlainText] = React.useState<string>('');

  React.useEffect(() => {
    getArticlePagination().then((pageNumber) => setTotalPages(pageNumber));
  });

  React.useEffect(() => {
    getAllArticles(activePage).then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, [activePage]);

  const handleReset = () => setArticleMetaData(initArticleValue);

console.log('totalPages: ', totalPages);

  const handleSubmission = async (type: string) => {
    const audio = await generateTextToAudioURL(plainText);
    if (audio !== '' && articleContent && articleMetaData) {
      const serializedArticleContent = serialize(articleContent);
      articleMetaData.content = encodeObjectToBase64(serializedArticleContent);
    }
    const wordsPerMinute = 200;
    const totalReadingMinutes = Math.ceil(totalWords / wordsPerMinute);
    articleMetaData.word_count = totalWords;
    articleMetaData.character_count = totalCharacters;
    articleMetaData.reading_minutes = totalReadingMinutes;
    articleMetaData.id = IdGen('ARTICLE');
    articleMetaData.audio_url = audio;

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
    setPlainText(getTextFromEditorContent(articleContent));
    setTotalCharacters(plainText.length);
    setTotalWords(plainText.split(' ').length);
  }, [articleContent, plainText]);

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
      <section className='container px-4 mx-auto'>
        {/* Header section */}
        <div className='sm:flex sm:items-center sm:justify-between'>
          <ItemsHeader
            title='Article'
            totalItemLength={filteredItems?.length}
          />
          <DashboardDisplay
            oldContent={undefined}
            modalWrapperButtonName='Create Article'
            draftButtonTitle='Saves as Draft'
            postButtonTitle='Publish Article'
            textEditorContent={articleContent}
            setTextEditorContent={setArticleContent}
            handleSubmission={handleSubmission}
            totalCharacters={totalCharacters}
            totalWords={totalWords}
            showMetadataDrawer={showMetaDataDrawer}
          >
            <MetaDataDrawer
              handleMetadataChange={handleMetadataChange}
              stateValue={articleMetaData}
              setStateValue={setArticleMetaData}
              setShowMetaDataDrawer={setShowMetaDataDrawer}
              showMetaDataDrawer={showMetaDataDrawer}
              handleReset={handleReset}
            />
          </DashboardDisplay>
        </div>
        {/* DashboardFilterButtons & Search */}
        <div className='w-full mt-6 md:flex flex-wrap md:items-center md:justify-between'>
          <ViewButtons
            filteredItems={filteredItems}
            setView={setView}
            view={view}
          />
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
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 md:px-6 lg:px-8'>
          <Table
            headers={articleTableHeaders}
            loading={loading}
            data={filteredItems}
          />
        </div>
        {/* DashboardFooter */}
        <div className='mt-6 sm:flex sm:items-center sm:justify-between '>
          <CurrentPageInfo
            currentPageNumber={activePage / 10 + 1}
            totalPagerNumber={totalPages}
          />
          <PaginateButton
            handlePagination={handlePagination}
            pageNumberLimit={pageNumLimit}
            totalPageNumber={totalPages || 1}
          />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardArticles;
