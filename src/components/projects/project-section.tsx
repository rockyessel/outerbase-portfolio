import { ProjectItem } from '@/interface';
import React from 'react';
import ProjectCard from './card';

interface Props {
  sideProjects: ProjectItem[];
  professionalProjects: ProjectItem[];
}

const ProjectSection = (props: Props) => {
  return (
    <section className='flex flex-col gap-20'>
      <div>
        {props.professionalProjects?.length <= 0 ? (
          <p className=' text-lg md:text-3xl font-light'>
            No professional project has been added yet.
          </p>
        ) : (
          <ul className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 md:gap-2'>
            {props.professionalProjects?.map((project, index) => (
              <ProjectCard data={project} key={index} />
            ))}
          </ul>
        )}
      </div>

      <div>
        {props.sideProjects?.length <= 0 ? (
          <p className=' text-lg md:text-3xl font-light'>
            No side-project has been added yet.
          </p>
        ) : (
          <ul className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 md:gap-2'>
            {props.sideProjects?.map((project, index) => (
              <ProjectCard data={project} key={index} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
