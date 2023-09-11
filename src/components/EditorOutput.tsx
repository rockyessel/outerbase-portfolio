import { FC } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  OutputData,
  BlockToolData,
  ListBlockData,
  LinkBlockData,
  HeaderBlockData,
} from '@editorjs/editorjs';
import Link from 'next/link';

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
);

interface Props {
  content: OutputData;
}

function CustomImageRenderer({ data }: { data: BlockToolData }) {
  const src = data.file.url;

  return (
    <div className='relative w-full min-h-[15rem]'>
      <Image alt='image' className='object-contain' fill src={src} />
    </div>
  );
}

function CustomCodeRenderer({ data }: { data: BlockToolData }) {
  return (
    <pre className='bg-gray-800 rounded-md p-4'>
      <code className='text-gray-100 text-sm'>{data.code}</code>
    </pre>
  );
}

function CustomParagraphRenderer({ data }: { data: BlockToolData }) {
  console.log('CustomParagraphRenderer', data);
  return <p className='leading-3'>{data.text}</p>;
}

function CustomListRenderer({ data }: { data: ListBlockData }) {
  // Render a simple list
  if (data.style === 'unordered') {
    return (
      <ul className='list-disc'>
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  } else if (data.style === 'ordered') {
    // Render an ordered list
    return (
      <ol className='list-decimal'>
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    );
  } else {
    // Handle other list styles if needed
    return null;
  }
}

function CustomLinkRenderer({ data }: { data: LinkBlockData }) {
  console.log('CustomLinkRenderer', data);
  return (
    <Link
      className='underline'
      href={data.link}
      target='_blank'
      rel='noopener noreferrer'
    >
      <span>{data.meta.title}</span>
    </Link>
  );
}

function CustomHeaderRenderer({ data }: { data: HeaderBlockData }) {
  // Map header levels to appropriate HTML elements (e.g., h1 to h1, h2 to h2, etc.)
  const Tag = `h${data.level}`;

  return <Tag>{data.text}</Tag>;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
  // paragraph: CustomParagraphRenderer,
  list: CustomListRenderer, // Add your custom list renderer here
  linkTool: CustomLinkRenderer, // Add your custom link renderer here
  header: CustomHeaderRenderer,
};

const EditorOutput = ({ content }: Props) => {
  return (
    <article className='typography'>
      <Output renderers={renderers} data={content} />
    </article>
  );
};

export default EditorOutput;
