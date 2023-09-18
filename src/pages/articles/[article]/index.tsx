import React from 'react';
import ArticleHeader from '@/components/articles/header';
import { CommonPathProps, getDataBySlug } from '@/utils/api-request';
import {
  GetStaticProps,
  GetStaticPaths,
  InferGetServerSidePropsType,
} from 'next';
import { ArticleItem, ArticleResponse, CommonPath, Params } from '@/interface';
import ArticleDetailedCard from '@/components/articles/detailed-card';
import CommentInput from '@/components/comments/input';
import DisqusCommentsEngine from '@/components/comments/external/disqus';
import CommentCard from '@/components/comments/card';

interface Props {}

const ArticleDetailedPage = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  const [hasIncremented, setHasIncremented] = React.useState<boolean>(false);
  const [showCommentInput, setShowCommentInput] = React.useState(false);

  // Function to toggle the comment input
  const toggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  return (
    <main className=' px-4 lg:px-14 xl:px-20 2xl:px-40 py-2 '>
      <ArticleHeader data={props.articleData} />
      <ArticleDetailedCard data={props.articleData} />
      <DisqusCommentsEngine />
      <section>
        <div>
          <p>Choose Your Comment Engine</p>
          <div className='flex items-center gap-5 border-b-[1px] border-rose-700 border-opacity-50 pb-5'>
            <p className='inline-flex items-center gap-1'>
              <img
                className='w-4 h-4 rounded-lg'
                src='https://c.disquscdn.com/next/current/marketing/assets/img/brand/disqus-social-icon-white-blue.svg'
                alt=''
              />
              Disqus
            </p>
            <p className='inline-flex items-center gap-1'>
              <img
                className='w-4 h-4 rounded-lg'
                src='https://c.disquscdn.com/next/current/marketing/assets/img/brand/disqus-social-icon-white-blue.svg'
                alt=''
              />
              Disqus
            </p>
          </div>
        </div>
        <div>
          <section className='bg-white antialiased p-4'>
            <div className=''>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-lg lg:text-2xl font-bold text-rose-900'>
                  Comments (20)
                </h2>
              </div>
              <CommentInput
                articleId={props.articleData.id}
                parentCommentId={undefined}
                style={undefined}
              />
              <CommentCard comment={props} />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default ArticleDetailedPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const projectPath: CommonPath = await CommonPathProps('public.articles');
  const paths = projectPath?.response?.items?.map((path) => ({
    params: { article: path.slug },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{
  articleData: ArticleItem;
}> = async (context) => {
  const { article }: any = context.params as Params;
  const articleData: ArticleItem = await getDataBySlug(
    'public.articles',
    article
  );
  console.log('articleData: SERVER:', articleData);
  if (!articleData) return { notFound: true };
  return {
    props: { articleData: JSON.parse(JSON.stringify(articleData)) },
    revalidate: 1,
  };
};
