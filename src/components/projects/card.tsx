import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { AiFillFolderOpen } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';
import { SiWebmoney } from 'react-icons/si';
import { ProjectItem } from '@/interface';
import { toolSkills } from '@/utils/services';

interface Props {
  data: ProjectItem;
}

const ProjectCard = (props: Props) => {
  const tools = props.data?.tags?.split(',').map((tool) => tool.trim());
  const MAX_TITLE: number = 70;
  const MAX_DESCRIPTION: number = 200;
  const sliceDes: string = `${props.data?.short_description?.slice(0, MAX_DESCRIPTION)}...`;
  const sliceTitle: string = `${props.data?.name?.slice(0, MAX_TITLE)}...`;
  const isTitleLonger: boolean = props.data?.name?.length > MAX_TITLE;
  const isDesLonger: boolean = props.data?.short_description?.length > MAX_DESCRIPTION;

  return (
    
      <li className='group bg-[#18202b]  md:bg-transparent w-full h-auto relative cursor-pointer rounded-md items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30'>
        <header className='hidden md:block md:h-[15rem] w-full'>
          <Image
            className='hidden md:block h-full w-full rounded-md object-cover object-center transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125'
            src={props.data?.main_image}
            alt=''
            width={1000}
            height={1000}
          />
        </header>
        <div className='md:absolute hidden md:block inset-0 group-hover:backdrop-blur-[2px] bg-gradient-to-b from-transparent via-[#18202b]/90 to-[#18202b] group-hover:from-[#18202b]/[1] group-hover:via-[#18202b]/80 group-hover:to-[#18202b]/[1]'></div>

        <main className='md:absolute w-full h-auto md:inset-0 flex md:translate-y-[50%] flex-col items-start p-4 transition-all duration-500 md:group-hover:translate-y-0'>
          <div>
            <p className='font-noe text-lg md:text-3xl font-bold'>
              {isTitleLonger ? sliceTitle : props.data?.name}
            </p>

            <ul className='flex flex-wrap items-center gap-2'>
              {toolSkills?.map((list, index) =>
                tools?.includes(list.name) ? (
                  <Link
                    key={index}
                    href={`/project/${list.name.toLocaleLowerCase()}`}
                  >
                    <li
                      className=' text-xs cursor-pointer inline-flex items-center gap-1 border border-rose-500 text-white p-1 font-medium'
                      title={list?.name}
                    >
                      {list?.icon} {list?.name}
                    </li>
                  </Link>
                ) : null
              )}
            </ul>
          </div>

          <p className='mb-3 md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100'>
            {isDesLonger ? sliceDes : props.data?.short_description}
          </p>

          <footer className='w-full flex justify-between items-center text-[2.6rem]'>
            <div className='flex items-center gap-5'>
              <a
                title='Github'
                target={`_blank`}
                href={`${props.data?.source_code}`}
              >
                <span title='Github'>
                  <BsGithub className='p-1 rounded-md' />
                </span>
              </a>

              <a
                title='Live Website'
                target={`_blank`}
                href={`${props.data?.live_url}`}
              >
                <span title='Live Website'>
                  <SiWebmoney className='p-1 rounded-md' />
                </span>
              </a>
            </div>

            <div className='group flex items-center gap-5'>
              <Link href={`/projects/${props.data?.slug}`}>
                <span title='Open For More Details'>
                  <AiFillFolderOpen className='p-1 rounded-md' />
                </span>
              </Link>
            </div>
          </footer>
        </main>
      </li>
   
  );
};

export default ProjectCard;
