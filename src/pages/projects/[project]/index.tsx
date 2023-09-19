import React from 'react';
import { CommonPath, Params, ProjectResponse } from '@/interface';
import ProjectDetailsCard from '@/components/projects/detailed-card';
import { CommonPathProps, getDataBySlug } from '@/utils/api-request';
import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from 'next';

const ProjectDetailedPage = ({ projectData }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  console.log('projectData', projectData);
  return <main className='px-4 lg:px-14 xl:px-20 2xl:px-40 py-2  mt-5 md:mt-28'>
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
  const projectData: ProjectResponse = await getDataBySlug('public.projects',project);
  if (!projectData) return { notFound: true };
  return {
    props: { projectData: JSON.parse(JSON.stringify(projectData)) },
    revalidate: 1,
  };
};
