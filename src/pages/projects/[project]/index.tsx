import React from 'react';
import {
  CommentProps,
  CommonPath,
  Params,
  ProjectItem,
  ProjectResponse,
} from '@/interface';
import ProjectDetailsCard from '@/components/projects/detailed-card';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from 'next';
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from '@/utils/outerbase-req/projects';
import { getFormatCommentsAndReplies } from '@/utils/outerbase-req/comments';
import CommentEngineWrapper from '@/components/comments/wrapper';
// import Link from 'next/link';

const ProjectDetailedPage = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  console.log('projectData', props);
  return (
    <main className='px-4 lg:px-14 xl:px-20 2xl:px-40 py-2  mt-5 md:mt-28'>
      {/* <section className='fixed w-[200px] h-[200px] right-0 top-[30%] rotate-90 hidden md:flex md:gap-1 z-[101]'>
        <Link
          href='/contact-us'
          className='btn btn-primary rounded-none bg-green-800 border-green-800 active:text-black active:bg-transparent hover:bg-green-900 hover:border-green-800'
        >
          Schedule A Visit
        </Link>
        <Link
          href='/about'
          className='btn btn-primary rounded-none bg-green-800 border-green-800 active:text-black active:bg-transparent hover:bg-green-900 hover:border-green-800'
        >
          More About Us!
        </Link>
      </section> */}
      <ProjectDetailsCard data={props.projectData} />
      {props.comments && props.projectData.is_comment_disabled === true ? (
        <p>The author disabled comment for this post.</p>
      ) : (
        <CommentEngineWrapper
          id={props.projectData?.id}
          commentHistory={props.comments}
        />
      )}
    </main>
  );
};

export default ProjectDetailedPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const projectSlugs: CommonPath = await getAllProjectSlugs();
  const paths = projectSlugs?.response?.items?.map((path) => ({
    params: { project: path.slug },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{
  projectData: ProjectItem;
  comments: CommentProps[];
}> = async (context) => {
  const { project }: any = context.params as Params;
  const projectData: ProjectItem = await getProjectBySlug(project);
  const comments = await getFormatCommentsAndReplies(
    projectData.id,
    'projects'
  );
  if (!projectData || !comments) return { notFound: true };
  return {
    props: JSON.parse(JSON.stringify({ projectData, comments })),
    revalidate: 1,
  };
};
