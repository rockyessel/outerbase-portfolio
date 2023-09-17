import React from 'react';
import { OutputData } from '@editorjs/editorjs';
import { getContent, getDataBySlug } from '@/utils/api-request';
import EditorOutput from '@/components/EditorOutput';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import { Params } from 'pusher';

const PreviewPage = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <main className='w-full h-full flex flex-col gap-10 px-4 lg:px-14 xl:px-20 2xl:px-40 py-2 pb-5 mt-5 md:mt-28'>
      <EditorOutput content={props.aboutData} />
    </main>
  );
};

export default PreviewPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const projectPath: CommonPath = await CommonPathProps('projects');
  const paths = projectPath?.response?.items?.map((path) => ({ params: { project: path.slug }}));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{ projectData: ProjectResponse }> = async (context) => {
  const { preview }: any = context.params as Params;
  const projectData: ProjectResponse = await getDataBySlug('projects', preview);
  if (!projectData) return { notFound: true };
  return {
    props: { projectData: JSON.parse(JSON.stringify(projectData)) },
    revalidate: 1,
  };
};
