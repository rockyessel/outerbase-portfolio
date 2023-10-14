import DashboardLayout from '@/components/dashboard/layout';
import React from 'react';
import ProgrammingLanguageDropdown from '@/components/dashboard/pages/about/programming-lan';
import WritingPlatformDropdown from '@/components/dashboard/pages/about/writing-platform';
import { developerToolsAndTech } from '@/utils/constants/about';
import ProjectFeatureCard from '@/components/articles/feature-card';

const DashboardAboutPage = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState('');

  return (
    <DashboardLayout>
      <section className='col-span-8 overflow-hidden rounded-xl sm:px-8 sm:shadow pb-10'>
        {/* Title */}
        <div className='pt-4'>
          <h1 className='py-2 text-2xl font-semibold'>About Page</h1>
        </div>

        <hr className='mt-4 mb-8' />

        {/* About Developer */}
        <div>
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
              <fieldset className='w-full mt-4'>
                <p className='text-left'>Github username @</p>
                <p className='text-left text-xs text-gray-400'>
                  Provide the e-mail address you always check on.
                </p>
                <fieldset className='mt-2'>
                  <input
                    type='text'
                    required
                    name='email'
                    title='Email'
                    placeholder='rockyessel'
                    className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
              </fieldset>
            </form>{' '}
          </div>
        </div>

        <hr className='mt-4 mb-8' />

        {/* Profile Picture */}
        <div>
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
        </div>

        <hr className='mt-4 mb-8' />

        {/* Featured Project */}
        <div>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-col gap-2'>
              <div className='inline-flex items-center justify-between'>
                <p className='py-2 text-xl font-semibold'>Feature Projects</p>
                <button>Feature a project</button>
              </div>

              <section className='flex flex-col gap-4'>
                <ProjectFeatureCard />
                <ProjectFeatureCard />
                <ProjectFeatureCard />
              </section>
            </div>
          </div>
        </div>

        <hr className='mt-4 mb-8' />

        {/* Github Graph */}
        <div>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-col gap-2'>
              <p className='py-2 text-xl font-semibold inline-flex flex-col gap-1'>
                Github Graph
                <span className='text-sm text-400'>
                  Would you like to show your Github Contribution on the about
                  page.
                </span>
              </p>
              <form className='w-full inline-flex items-start'>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    // checked={props.stateValue.is_comment_disabled}
                    className='sr-only peer'
                    type='checkbox'
                    // onChange={props.handleMetadataChange}
                    title='Disable Comments'
                    name='is_comment_disabled'
                  />
                  <div className="w-11 h-6 bg-rose-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-rose-900 after:border-rose-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                  <span className='ml-3 text-sm font-medium'>
                    {/* {props.stateValue.is_comment_disabled ? 'Yes' : 'No'} */}{' '}
                    Yes
                  </span>
                </label>
              </form>
            </div>
          </div>
        </div>

        <hr className='mt-4 mb-8' />

        {/* Technical Writing Platform @ */}
        <div>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-col'>
              <p className='py-2 text-xl font-semibold inline-flex flex-col gap-1'>
                Technical Writing Platform @
                <span className='text-sm text-400'>
                  Provide the full URL to your preferred platform
                </span>
              </p>

              <div>
                <WritingPlatformDropdown />
              </div>
            </div>
          </div>
        </div>

        <hr className='mt-4 mb-8' />

        {/* Tools & Technologies */}
        <div>
          {developerToolsAndTech.map((devToolsAndTech, index) => (
            <React.Fragment key={index}>
              <div className='mb-10'>
                <p className='py-2 text-xl font-semibold'>
                  {devToolsAndTech.title}
                </p>
                <div>
                  <ProgrammingLanguageDropdown
                    initialStateValues={devToolsAndTech.developerTools}
                  />
                </div>
              </div>
              <hr className='mt-4 mb-8' />
            </React.Fragment>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardAboutPage;
