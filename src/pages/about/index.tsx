import EditorOutput from '@/components/EditorOutput';
import React from 'react';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import { getContent } from '@/utils/api-request';
import { OutputData } from '@editorjs/editorjs';


interface Props {}

const AboutPage = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
console.log('About me', props)


  return (
    <main className='w-full h-full flex flex-col gap-10 px-4 lg:px-14 xl:px-20 2xl:px-40 py-2  pb-5 mt-5 md:mt-28'>
      <EditorOutput content={props.aboutData} />
    </main>
  );
};

export default AboutPage;
export const getStaticProps: GetStaticProps<{ aboutData: OutputData }> = async () => {
  const aboutData = await getContent();

  if (!aboutData) return { notFound: true };

  return {
    props: { aboutData: JSON.parse(JSON.stringify(aboutData)) },
    revalidate: 5,
  };
};
