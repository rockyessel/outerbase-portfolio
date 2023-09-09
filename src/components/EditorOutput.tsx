import { FC } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { EditorDataProps } from '@/interface';

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: EditorDataProps;
}

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className='relative w-full min-h-[15rem]'>
      <Image alt='image' className='object-contain' fill src={src} />
    </div>
  );
}

function CustomCodeRenderer({ data }: any) {
  data;

  return (
    <pre className='bg-gray-800 rounded-md p-4'>
      <code className='text-gray-100 text-sm'>{data.code}</code>
    </pre>
  );
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};
const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      style={style}
      className='text-sm'
      renderers={renderers}
      data={content}
    />
  );
};

export default EditorOutput;
