import Layout from '@/components/global/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getAllProfessionalProjects, getAllSideProjects, getMainContentHero } from '@/utils/api-request';
import { ApiResponse, ProjectResponse } from '@/interface';
import Hero from '@/components/global/hero';
import { defaultMetaData } from '@/utils/services';
import ContactSection from '@/components/global/contact-section';
import ProjectSection from '@/components/projects/project-section';

const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(props)
  return (
    <Layout {...defaultMetaData}>
      <main className='w-full h-full flex flex-col gap-20 px-4 lg:px-14 xl:px-20 2xl:px-40 pb-5'>
        <Hero data={props?.main_content_hero?.response?.items[0]} />
        <ProjectSection sideProjects={props.sideProjects?.response?.items} professionalProjects={props.professionalProjects?.response?.items} />
        <ContactSection data={props?.main_content_hero?.response?.items[0]} />
      </main>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<{ main_content_hero: ApiResponse, sideProjects: ProjectResponse, professionalProjects: ProjectResponse }> = async () => {
  const main_content_hero: ApiResponse = await getMainContentHero();
  const sideProjects: ProjectResponse = await getAllSideProjects();
  const professionalProjects: ProjectResponse = await getAllProfessionalProjects();
  if (!main_content_hero || !sideProjects || !professionalProjects)
    return { notFound: true };
  return {
    props: JSON.parse(
      JSON.stringify({ main_content_hero, sideProjects, professionalProjects })
    ),
  };
};
