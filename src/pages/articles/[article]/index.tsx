import React from 'react';
import ArticleHeader from '@/components/articles/header';
import { CommonPathProps, getDataBySlug } from '@/utils/api-request';
import {
  GetStaticProps,
  GetStaticPaths,
  InferGetServerSidePropsType,
} from 'next';
import { ArticleResponse, CommonPath, Params } from '@/interface';
import ArticleDetailedCard from '@/components/articles/detailed-card';

interface Props {}

const ArticleDetailedPage = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  const [hasIncremented, setHasIncremented] = React.useState<boolean>(false);
  return (
    <main className='max_screen:w-full max_screen:px-4 px-4 xl:w-[70rem] mx-auto mt-5 md:mt-28'>
      <ArticleHeader data={props.articleData.response.items[0]} />
      <ArticleDetailedCard data={props.articleData.response.items[0]} />
    </main>
  );
};

export default ArticleDetailedPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const projectPath: CommonPath = await CommonPathProps('articles');
  const paths = projectPath?.response?.items?.map((path) => ({
    params: { article: path.slug },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{
  articleData: ArticleResponse;
}> = async (context) => {
  const { article }: any = context.params as Params;
  const articleData: ArticleResponse = await getDataBySlug('articles', article);
  if (articleData.response.count === 0) return { notFound: true };
  return {
    props: { articleData: JSON.parse(JSON.stringify(articleData)) },
    revalidate: 5,
  };
};
