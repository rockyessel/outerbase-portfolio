import SeoDrawer from '@/components/dashboard/global/metadata-drawer';
import TextEditor from '@/components/dashboard/global/text-editor';
import DashboardLayout from '@/components/dashboard/layout';
import { createOrUpdateContent, getContent } from '@/utils/api-request';
import { OutputData } from '@editorjs/editorjs';
import React from 'react';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import ProgrammingLanguageDropdown from '@/components/dashboard/pages/about/programming-lan';
import WritingPlatformDropdown from '@/components/dashboard/pages/about/writing-platform';
import {
  availableLanguages,
  webDevelopmentFrameworks,
} from '@/utils/constants/about';
import { RiUploadCloud2Fill } from 'react-icons/ri';

const DashboardAboutPage = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  const [textEditorContentAbout, setTextEditorContentAbout] =
    React.useState<OutputData>();
  const [selectedLanguage, setSelectedLanguage] = React.useState('');

  console.log('selectedLanguage: ', selectedLanguage);

  const loading = false;

  return (
    <DashboardLayout>
      <div className='col-span-8 overflow-hidden rounded-xl sm:px-8 sm:shadow'>
        <div className='pt-4'>
          <h1 className='py-2 text-2xl font-semibold'>About Page</h1>
        </div>
        <hr className='mt-4 mb-8' />
        <p className='py-2 text-xl font-semibold'>Profile</p>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <form className='w-full'>
            <fieldset>
              <p className='text-gray-400'>
                This information will be share across this platform. And note
                every information should authentic
              </p>
              <fieldset className='w-full flex items-center gap-12 mt-3'>
                <fieldset className='w-full'>
                  <p className='text-left'>Full name</p>
                  <p className='text-left text-xs text-gray-400'>
                    Provide your real name here.
                  </p>
                  <fieldset className='mt-2'>
                    <input
                      type='text'
                      required
                      name='full_name'
                      title='Full Name'
                      placeholder='Enter GitHub repo URL'
                      className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    />
                  </fieldset>
                </fieldset>
                <fieldset className='w-full'>
                  <p className='text-left'>Email</p>
                  <p className='text-left text-xs text-gray-400'>
                    Provide the e-mail address you always check on.
                  </p>
                  <fieldset className='mt-2'>
                    <input
                      type='text'
                      required
                      name='email'
                      title='Email'
                      placeholder='Enter GitHub repo URL'
                      className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    />
                  </fieldset>
                </fieldset>
              </fieldset>
            </fieldset>
          </form>{' '}
        </div>
        <hr className='mt-4 mb-8' />
        <p className='py-2 text-xl font-semibold'>Profile Picture</p>
        <div className='flex items-center'>
          <div className='flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3'>
            <div className='w-48 h-48 relative'>
              <label className='inline-flex items-center justify-center bg-rose-500 w-full h-full rounded-full border-dashed border-rose-700 border-[1px] border-opacity-50'>
                <span className='w-full h-full inline-flex items-center text-4xl font-bold backdrop-blur-lg dark:text-gray-400 rainbow rounded-full justify-center'>
                  RE
                </span>
                <input type='file' className='w-0 h-0' />
              </label>
            </div>
          </div>

          <div className='flex flex-col'>
            <button
              type='submit'
              className='inline-flex mx-5 my-2 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            >
              Upload a Picture
            </button>
            <button
              type='submit'
              className='inline-flex mx-5 my-2 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            >
              Delete
            </button>
          </div>
        </div>

        <hr className='mt-4 mb-8' />

        <div className='mb-10'>
          <p className='py-2 text-xl font-semibold'>Programming Languages</p>

          <div>
            <ProgrammingLanguageDropdown
              initialStateValues={availableLanguages}
            />
          </div>
        </div>
        <hr className='mt-4 mb-8' />
        <div className='mb-10'>
          <p className='py-2 text-xl font-semibold'>Programming Languages</p>
        </div>
        <hr className='mt-4 mb-8' />
        <div className='mb-10'>
          <p className='py-2 text-xl font-semibold'>Programming Languages</p>
        </div>
        <hr className='mt-4 mb-8' />
        <div className='mb-10'>
          <p className='py-2 text-xl font-semibold'>Programming Languages</p>
        </div>
        <hr className='mt-4 mb-8' />
      </div>
    </DashboardLayout>
  );
};

export default DashboardAboutPage;
export const getStaticProps: GetStaticProps<{
  aboutData: OutputData;
}> = async () => {
  const aboutData = await getContent('public.about_dev', 1);
  if (!aboutData) return { notFound: true };
  return {
    props: { aboutData: JSON.parse(JSON.stringify(aboutData)) },
    revalidate: 5,
  };
  {
    /* <label className='w-40 h-40 bg-transparent border-[1px] rounded-full relative'>
    <span className='w-full h-full inline-flex items-center text-4xl font-bold backdrop-blur-lg dark:text-gray-400 rainbow rounded-full justify-center'>
      RE
    </span>
    <input type='file' className='w-0 h-0' />
    <RiUploadCloud2Fill className='bg-[rgba(255,255,255,0.1)] backdrop-blur-lg rounded-full text-5xl border-[1px] p-3 absolute -right-5 top-12' />
  </label> */
  }

  {
    /* <div className='col-span-8 overflow-hidden rounded-xl sm:px-8 sm:shadow'>
    <h1 className='py-2 text-2xl font-semibold'>About Page</h1>
  </div>
  <hr className='mt-4 mb-8' />
  <form>
    <fieldset>
      <p>
        This information will be share across this platform. And note every
        information should authentic
      </p>
      <fieldset className='w-full flex items-center gap-2 mt-3'>
        <fieldset className='w-full'>
          <p className='text-left'>Full name</p>
          <p className='text-left text-xs text-gray-400'>
            Provide your real name here.
          </p>
          <fieldset>
            <input
              type='text'
              required
              name='full_name'
              title='Full Name'
              placeholder='Enter GitHub repo URL'
              className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </fieldset>
        </fieldset>
        <fieldset className='w-full'>
          <p className='text-left'>Email</p>
          <p className='text-left text-xs text-gray-400'>
            Provide the e-mail address you always check on.
          </p>
          <fieldset>
            <input
              type='text'
              required
              name='email'
              title='Email'
              placeholder='Enter GitHub repo URL'
              className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </fieldset>
        </fieldset>
      </fieldset>
    </fieldset>
    <hr className='mt-4 mb-8' />
  </form> */
  }
};

{
  /* <div className='container mx-auto mt-4 flex items-center'>
  <div>
    <h1 className='text-2xl font-bold mb-4'>
      Select Your Favorite Programming Language
    </h1>
    <ProgrammingLanguageDropdown 
      initialStateValues={availableLanguages}
    />
    <ProgrammingLanguageDropdown
      initialStateValues={webDevelopmentFrameworks}
    />
    <p className='mt-4'>Selected Language: {selectedLanguage}</p>
  </div>
  <div>
    <WritingPlatformDropdown />
  </div>
</div> */
}
{
  /* <fieldset className='w-full my-2 flex items-center justify-between gap-2'>
      <fieldset className='w-full'>
        <fieldset className='w-full'>
          <p className='text-left'>Where you write @</p>
          <p className='text-left text-xs text-gray-400'>
            Provide the full URL of the platform you write @.
          </p>
        </fieldset>
        <fieldset className='w-full flex flex-col ring-2 ring-opacity-50 ring-rose-700 p-2 rounded-lg gap-2 mt-2'>
          <fieldset>
            <label>Hashnode</label>
            <fieldset>
              <input
                type='text'
                required
                name='full_name'
                title='Full Name'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
          <fieldset className='w-full'>
            <p className='text-left'>HackerNoon</p>

            <fieldset>
              <input
                type='text'
                required
                name='email'
                title='Email'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
          <fieldset className='w-full'>
            <p className='text-left'>Medium</p>

            <fieldset>
              <input
                type='text'
                required
                name='email'
                title='Email'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
          <fieldset className='w-full'>
            <p className='text-left'>Dev.to</p>

            <fieldset>
              <input
                type='text'
                required
                name='email'
                title='Email'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
          <fieldset className='w-full'>
            <p className='text-left'>FreeCodeCamp</p>

            <fieldset>
              <input
                type='text'
                required
                name='email'
                title='Email'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
          <fieldset className='w-full'>
            <p className='text-left'>Velog</p>

            <fieldset>
              <input
                type='text'
                required
                name='email'
                title='Email'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
          <fieldset className='w-full'>
            <p className='text-left'>Others</p>

            <fieldset>
              <input
                type='text'
                required
                name='email'
                title='Email'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
        </fieldset>
      </fieldset>

      <fieldset className='w-full'>
        <fieldset className='w-full'>
          <p className='text-left'>Socials @</p>
          <p className='text-left text-xs text-gray-400'>
            Provide the full URL of the platform you write @.
          </p>
        </fieldset>
        <fieldset className='w-full flex flex-col ring-2 ring-opacity-50 ring-rose-700 p-2 rounded-lg gap-2 mt-2'>
          <fieldset>
            <label>Twitter Profile</label>
            <fieldset>
              <input
                type='text'
                required
                name='full_name'
                title='Full Name'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
          <fieldset className='w-full'>
            <p className='text-left'>Instagram Profile</p>

            <fieldset>
              <input
                type='text'
                required
                name='email'
                title='Email'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
          <fieldset className='w-full'>
            <p className='text-left'>Github Profile</p>

            <fieldset>
              <input
                type='text'
                required
                name='email'
                title='Email'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
          <fieldset className='w-full'>
            <p className='text-left'>StackOverflow Profile</p>

            <fieldset>
              <input
                type='text'
                required
                name='email'
                title='Email'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
          <fieldset className='w-full'>
            <p className='text-left'>Linkedin Profile</p>

            <fieldset>
              <input
                type='text'
                required
                name='email'
                title='Email'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
          <fieldset className='w-full'>
            <p className='text-left'>Facebook Profile</p>

            <fieldset>
              <input
                type='text'
                required
                name='email'
                title='Email'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
          <fieldset className='w-full'>
            <p className='text-left'>Others</p>

            <fieldset>
              <input
                type='text'
                required
                name='email'
                title='Email'
                placeholder='Enter GitHub repo URL'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
        </fieldset>
      </fieldset>
    </fieldset> */
}
{
  /* <div className='sticky top-0 left-0 z-[20] w-full p-4 bg-[rgba(255,255,255,0.1)] shadow md:flex md:items-center md:justify-between md:p-6'>
    <p className='text-sm'>
      Use{' '}
      <kbd className='rounded-md border text-white bg-muted px-1 text-xs uppercase'>
        Tab
      </kbd>{' '}
      to open the command menu.
    </p>
    <div className='flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0'>
      <button
        className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
        onClick={handleSaveContent}
      >
        Save
      </button>
    </div>
  </div>
  <TextEditor
    oldContent={props.aboutData}
    value={textEditorContentAbout}
    set={setTextEditorContentAbout}
  /> */
}
