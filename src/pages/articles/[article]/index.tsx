import React from 'react';
import { processComments } from '@/utils/function';
import ArticleHeader from '@/components/articles/header';
import CommentEngineWrapper from '@/components/comments/wrapper';
import { getArticleComments, getFormatCommentsAndReplies } from '@/utils/outerbase-req/comments';
import ArticleDetailedCard from '@/components/articles/detailed-card';
import { ArticleItem, CommentProps, CommonPath, Params } from '@/interface';
import { getAllArticlesSlugs, getArticleBySlug } from '@/utils/api-request';
import { GetStaticProps, GetStaticPaths, InferGetServerSidePropsType } from 'next';


const ArticleDetailedPage = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const [hasIncremented, setHasIncremented] = React.useState<boolean>(false);
  const [commentHistory, setCommentHistory] = React.useState<any[]>();

  console.log('commentHistory', commentHistory);

  const fetchArticleComments = async (articleId: string) => {
    if (articleId) {
      const comments = await getFormatCommentsAndReplies(articleId);
    
      setCommentHistory(comments);
    }
  };

  React.useEffect(() => {
    fetchArticleComments(props.articleData.id);
  }, [props.articleData.id]);

  console.log('commentHistory: ', commentHistory);

  return (
    <main className=' px-4 lg:px-14 xl:px-20 2xl:px-40 py-2 '>
      <ArticleHeader data={props.articleData} />
      <ArticleDetailedCard data={props.articleData} />
      {commentHistory && (
        <CommentEngineWrapper
          articleId={props.articleData?.id}
          commentHistory={commentHistory}
        />
      )}
    </main>
  );
};

export default ArticleDetailedPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const articlePath: CommonPath = await getAllArticlesSlugs();
  const paths = articlePath?.response?.items?.map((path) => ({
    params: { article: path.slug },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{
  articleData: ArticleItem;
}> = async (context) => {
  const { article }: any = context.params as Params;
  const articleData: ArticleItem = await getArticleBySlug(article);
  if (!articleData) return { notFound: true };
  return {
    props: JSON.parse(JSON.stringify({ articleData })),
    revalidate: 1,
  };
};
