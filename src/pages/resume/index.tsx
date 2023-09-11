import React from 'react';
import { OutputData } from '@editorjs/editorjs';
import { getContent } from '@/utils/api-request';
import EditorOutput from '@/components/EditorOutput';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';

const ResumePage = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <main className='w-full h-full flex flex-col gap-10 px-4 lg:px-14 xl:px-20 2xl:px-40 py-2 pb-5 mt-5 md:mt-28 prose-2xl prose-headings:text-rose-800 prose-p:text-white prose-gray'>
      <EditorOutput content={props.resumeData} />
    </main>
  );
};

export default ResumePage;
export const getStaticProps: GetStaticProps<{ resumeData: OutputData }> = async () => {
  const resumeData = await getContent('public.resume_dev', 1);
  if (!resumeData) return { notFound: true };
  return {
    props: { resumeData: JSON.parse(JSON.stringify(resumeData)) },
    revalidate: 5,
  };
};
