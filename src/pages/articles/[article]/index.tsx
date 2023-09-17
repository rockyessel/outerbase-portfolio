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
import CommentCard from '@/components/comments/card';

interface Props {}

const ArticleDetailedPage = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  const [hasIncremented, setHasIncremented] = React.useState<boolean>(false);
  return (
    <main className=' px-4 lg:px-14 xl:px-20 2xl:px-40 py-2 '>
      <ArticleHeader data={props.articleData} />
      <ArticleDetailedCard data={props.articleData} />
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
                <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
                  Comments (20)
                </h2>
              </div>
              <form className='mb-6'>
                <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                  <label className='sr-only'>Your comment</label>
                  <textarea
                    id='comment'
                    className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                    placeholder='Write a comment...'
                    required
                  ></textarea>
                </div>
                <button
                  type='submit'
                  className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
                >
                  Post comment
                </button>
              </form>
              <CommentCard />

              <article className='p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900'>
                <footer className='flex justify-between items-center mb-2'>
                  <div className='flex items-center'>
                    <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
                      <img
                        className='mr-2 w-6 h-6 rounded-full'
                        src='https://flowbite.com/docs/images/people/profile-picture-3.jpg'
                        alt='Bonnie Green'
                      />
                      Bonnie Green
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      <time title='March 12th, 2022'>Mar. 12, 2022</time>
                    </p>
                  </div>
                  <button
                    id='dropdownComment3Button'
                    data-dropdown-toggle='dropdownComment3'
                    className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                    type='button'
                  >
                    <svg
                      className='w-4 h-4'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 16 3'
                    >
                      <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
                    </svg>
                    <span className='sr-only'>Comment settings</span>
                  </button>
                  {/* <!-- Dropdown menu --> */}
                  <div
                    id='dropdownComment3'
                    className='hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
                  >
                    <ul
                      className='py-1 text-sm text-gray-700 dark:text-gray-200'
                      aria-labelledby='dropdownMenuIconHorizontalButton'
                    >
                      <li>
                        <a
                          href='#'
                          className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          href='#'
                          className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Remove
                        </a>
                      </li>
                      <li>
                        <a
                          href='#'
                          className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Report
                        </a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className='text-gray-500 dark:text-gray-400'>
                  The article covers the essentials, challenges, myths and
                  stages the UX designer should consider while creating the
                  design strategy.
                </p>
                <div className='flex items-center mt-4 space-x-4'>
                  <button
                    type='button'
                    className='flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium'
                  >
                    <svg
                      className='mr-1.5 w-3.5 h-3.5'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 18'
                    >
                      <path
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z'
                      />
                    </svg>
                    Reply
                  </button>
                </div>
              </article>
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
