import EditorOutput from '@/components/EditorOutput';
import React from 'react';

interface Props {}

const AboutPage = () => {
  return (
    <main className='w-full h-full flex flex-col gap-10 px-4 lg:px-14 xl:px-20 2xl:px-40 py-2  pb-5 mt-5 md:mt-28'>
      <EditorOutput content={post.content} />
    </main>
  );
};

export default AboutPage;
