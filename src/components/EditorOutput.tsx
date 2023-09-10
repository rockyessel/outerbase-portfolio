import { FC } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { OutputData } from '@editorjs/editorjs';

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
);
interface Props {
  content: OutputData;
}

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;
  console.log('Image: ',data)
  
  return (
    <div className='relative w-full min-h-[15rem]'>
      <Image alt='image' className='object-contain' fill src={src} />
    </div>
  );
}

function CustomCodeRenderer({ data }: any) {
  data;

    console.log('Code: ',data)
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

const EditorOutput = ({ content }: Props) => {
  return (
    <Output
      // style={style}
      className='prose-xl'
      renderers={renderers}
      data={content}
    />
  );
};

export default EditorOutput;
