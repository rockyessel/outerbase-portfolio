import { CommonPath, Params, ProjectResponse } from '@/interface';
import { CommonPathProps, getDataBySlug } from '@/utils/api-request';
import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from 'next';

interface Props {}

const ProjectDetailedPage = ({ projectData }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  console.log('projectData', projectData);
  return <div>ProjectDetailedPage</div>;
};

export default ProjectDetailedPage;
export const getStaticPaths: GetStaticPaths = async () => {
  const projectPath: CommonPath = await CommonPathProps('projects');

  const paths = projectPath?.response?.items?.map((path) => ({
    params: {
      project: path.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};


export const getStaticProps: GetStaticProps<{ projectData: ProjectResponse }> = async (context) => {
  const { project }: any = context.params as Params;

  const projectData: ProjectResponse = await getDataBySlug('projects',project);

  if (!projectData) return { notFound: true };

  return {
    props: { projectData: JSON.parse(JSON.stringify(projectData)) },
    revalidate: 5,
  };
};
