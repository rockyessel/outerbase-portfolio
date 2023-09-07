import { ProjectItem } from '@/interface';
import { toolSkills } from '@/utils/services';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';

interface Props {
  data: ProjectItem;
}

const ProjectDetailsCard = (props: Props) => {
  const [image, setImage] = React.useState<number>(0);
  const tools = props.data?.tags?.split(',')?.map((tool) => tool.trim());
  const images = props.data?.other_image?.split(',')?.map((image) => image.trim());

  return (
    <React.Fragment>
      <header className='flex flex-col gap-2'>
        <h1 className='font-extrabold max_screen:text-4xl text-7xl capitalize'>
          {props.data?.name}
        </h1>

        <div className='flex items-center justify-between gap-2 w-full flex-wrap mb-2'>
          <a target={`_blank`} href={props.data?.live_url}>
            <span className='inline-flex items-center gap-1 p-2 w-fit border border-rose-500 text-white rounded-md'>
              See Live <FiExternalLink />
            </span>
          </a>
          <a target={`_blank`} href={props.data?.source_code}>
            <span className='inline-flex items-center gap-1 p-2 w-fit border border-rose-500 text-white rounded-md'>
              Github <FiExternalLink />
            </span>
          </a>
        </div>

        <div className='flex flex-col flex-wrap gap-1'>
          <div>
            <ul className='rounded-md py-2 flex flex-wrap gap-2 items-center'>
              {toolSkills?.map((list, index) =>
                tools?.includes(list.name) ? (
                  <Link
                    key={index}
                    href={`/project/${list.name.toLocaleLowerCase()}`}
                  >
                    <li
                      className='tooltip cursor-pointer inline-flex items-center gap-1 border border-rose-500 text-white p-1 font-medium'
                      data-tip={list?.name}
                    >
                      {list?.icon} {list?.name}
                    </li>
                  </Link>
                ) : null
              )}
            </ul>
          </div>
        </div>
      </header>
      <main>
        <div>
          <Image
            className='w-full rounded-md mb-4 shadow-md'
            src={images && images[image]}
            width={1000}
            height={1000}
            alt=''
            priority
          />
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          {images?.map((img, index) => (
            <Image
              key={index}
              className='rounded-sm mb-4 w-10 sm:w-16 md:w-24 md:h-20 object-cover object-center shadow-md'
              src={img !== null ? img : ''}
              width={1000}
              height={1000}
              onClick={() => setImage(index)}
              alt={props.data?.name}
              priority
            />
          ))}
        </div>
        <div>
          <article className='prose-xl mb-5 text-gray-300'>
            {props.data?.description}
          </article>
        </div>
      </main>
      <footer></footer>
    </React.Fragment>
  );
};

export default ProjectDetailsCard;
