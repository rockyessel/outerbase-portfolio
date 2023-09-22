import React from 'react';
import ArticleHeader from '@/components/articles/header';
import CommentEngineWrapper from '@/components/comments/wrapper';
import { getFormatCommentsAndReplies } from '@/utils/outerbase-req/comments';
import ArticleDetailedCard from '@/components/articles/detailed-card';
import { ArticleItem, CommentProps, CommonPath, Params } from '@/interface';
import { getAllArticlesSlugs, getArticleBySlug } from '@/utils/api-request';
import { GetStaticProps, GetStaticPaths, InferGetServerSidePropsType } from 'next';
import { increaseArticleViewCount, updateCommentOnLoad } from '@/utils/outerbase-req/articles';

const ArticleDetailedPage = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const [hasIncremented, setHasIncremented] = React.useState<boolean>(false);

  // Update the comment count after a comment is made.
  React.useEffect(() => {
    updateCommentOnLoad(props.articleData.id)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, [props.articleData.id]);

  // Increase view count after the users spends 5 seconds on the article
  React.useEffect(() => {
    if (!hasIncremented) {
      const time = setTimeout(() => {
        if (props.articleData) {
          increaseArticleViewCount(props.articleData.id)
            .then(() => {
              setHasIncremented(true);
            })
            .catch((error) => console.error(error));
        }
      }, 5000);

      return () => clearTimeout(time);
    }
  }, [hasIncremented, props.articleData]);

  return (
    <main className=' px-4 lg:px-14 xl:px-20 2xl:px-40 py-2 '>
      <ArticleHeader data={props.articleData} />
      <ArticleDetailedCard data={props.articleData} />
      {props.comments && (
        <CommentEngineWrapper
          articleId={props.articleData?.id}
          commentHistory={props.comments}
        />
      )}
    </main>
  );
};

export default ArticleDetailedPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const articlePath: CommonPath = await getAllArticlesSlugs();
  const paths = articlePath?.response?.items?.map((path) => ({params: { article: path.slug }}));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{articleData: ArticleItem; comments: CommentProps[]}> = async (context) => {
  const { article }: any = context.params as Params;
  const articleData: ArticleItem = await getArticleBySlug(article);
  const comments: CommentProps[] = await getFormatCommentsAndReplies(articleData.id);
  if (!articleData || !comments) return { notFound: true };
  return {
    props: JSON.parse(JSON.stringify({ articleData, comments })),
    revalidate: 1,
  };
};
