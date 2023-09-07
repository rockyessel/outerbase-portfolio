import React from 'react';
import { CommonPath, Params, ProjectResponse } from '@/interface';
import ProjectDetailsCard from '@/components/projects/detailed-card';
import { CommonPathProps, getDataBySlug } from '@/utils/api-request';
import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from 'next';

const ProjectDetailedPage = ({ projectData }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  console.log('projectData', projectData);
  return <main className='max_screen:w-full max_screen:px-4 px-4 xl:w-[70rem] mx-auto mt-5 md:mt-28'>
    <ProjectDetailsCard data={projectData?.response?.items[0]} />
  </main>
};

export default ProjectDetailedPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const projectPath: CommonPath = await CommonPathProps('projects');
  const paths = projectPath?.response?.items?.map((path) => ({ params: { project: path.slug }}));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{ projectData: ProjectResponse }> = async (context) => {
  const { project }: any = context.params as Params;
  const projectData: ProjectResponse = await getDataBySlug('projects',project);
  if (projectData.response.count === 0) return { notFound: true };
  return {
    props: { projectData: JSON.parse(JSON.stringify(projectData)) },
    revalidate: 5,
  };
};
