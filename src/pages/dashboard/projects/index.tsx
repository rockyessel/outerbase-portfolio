import DashboardLayout from '@/components/dashboard/layout';
import Table from '@/components/dashboard/projects/table';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdArrowBack } from 'react-icons/md';
import { IoMdArrowForward } from 'react-icons/io';
import { ProjectResponse } from '@/interface';
import {
  createArticle,
  encodeObjectToBase64,
  getAllProjects,
} from '@/utils/api-request';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import ModalWrapper from '@/components/dashboard/modal-wrapper';
import MetaDataDrawer from '@/components/dashboard/global/metadata-drawer';
import TextEditor from '@/components/dashboard/global/text-editor';
import { ArticleMetaDataProps, initialMetaDataValues } from '../articles';
import { OutputData } from '@editorjs/editorjs';
import serializeJavascript from 'serialize-javascript';
import { getTextFromEditorContent } from '@/utils/function';

interface Props {}

const DashboardProjects = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  console.log(props);
  const [showMetaDataDrawer, setShowMetaDataDrawer] =
    React.useState<boolean>(false);
  const [projectMetaData, setProjectMetaData] =
    React.useState<ArticleMetaDataProps>(initialMetaDataValues);
  const [projectContent, setProjectContent] = React.useState<OutputData>();

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(false);
  }, []);
  const tablesHeaders = ['Name', 'Live URL', 'Source Code', 'Tools', ''];

  const handleSubmission = async (type: string) => {
    if (projectContent && projectMetaData) {
      const serializedArticleContent = serializeJavascript(projectContent);
      const data = (projectMetaData.content = encodeObjectToBase64(
        serializedArticleContent
      ));
      console.log('data', data);
      console.log('projectMetaData: ', projectMetaData);
      const plainText = getTextFromEditorContent(projectContent);
      console.log('plainText: ', plainText);
    }

    // Make sure there's no empty string inn articleContent
    const ifThereIsData = true;

    switch (type) {
      case 'draft':
        if (ifThereIsData) createArticle(projectMetaData);
        break;
      case 'publish':
        projectMetaData.is_published = true;
        if (ifThereIsData) createArticle(projectMetaData);
        break;

      default:
        break;
    }
  };

  return (
    <DashboardLayout>
      <div>
        <section className='container px-4 mx-auto'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <div>
              <div className='flex items-center gap-x-3'>
                <h2 className='text-lg font-medium'>Projects</h2>

                <span className='px-3 py-1 text-xs bg-rose-700 rounded-full'>
                  {props.projects?.response?.items?.length} lists
                </span>
              </div>
            </div>

            <div className='flex items-center mt-4 gap-x-3'>
              <ModalWrapper buttonName='Add Project'>
                <MetaDataDrawer
                  set={setProjectMetaData}
                  // value={articleMetaData}
                  setShowMetaDataDrawer={setShowMetaDataDrawer}
                  showMetaDataDrawer={showMetaDataDrawer}
                />

                <section className='w-full h-screen overflow-y-auto'>
                  <TextEditor
                    oldContent={undefined}
                    value={projectContent}
                    set={setProjectContent}
                  />
                </section>

                <section className='px-4 py-2'>
                  <button
                    type='submit'
                    onClick={() => handleSubmission('draft')}
                  >
                    Save as Draft
                  </button>
                  <button
                    type='submit'
                    onClick={() => handleSubmission('publish')}
                  >
                    Publish Article
                  </button>
                </section>
              </ModalWrapper>
            </div>
          </div>

          <div className='mt-6 md:flex md:items-center md:justify-between'>
            <div className='inline-flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse'>
              <button className='px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm'>
                View all
              </button>

              <button className='px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm hover:bg-gray-100'>
                Published
              </button>

              <button className='px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm hover:bg-gray-100'>
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
                <div className='overflow-hidden border border-rose-200 md:rounded-lg'>
                  <Table
                    headers={tablesHeaders}
                    loading={loading}
                    data={props?.projects?.response?.items}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 sm:flex sm:items-center sm:justify-between '>
            <div className='text-sm'>
              Page <span className='font-medium text-gray-200'>1 of 10</span>
            </div>

            <div className='flex items-center mt-4 gap-x-4 sm:mt-0'>
              <button className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'>
                <MdArrowBack />

                <span>previous</span>
              </button>

              <button className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'>
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

export default DashboardProjects;

export const getStaticProps: GetStaticProps<{
  projects: ProjectResponse;
}> = async () => {
  const projects: ProjectResponse = await getAllProjects();

  return {
    props: JSON.parse(JSON.stringify({ projects })),
    revalidate: 10,
  };
};
