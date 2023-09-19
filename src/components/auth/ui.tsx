import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import Link from 'next/link';

interface Props {
  type: string;
  children: React.ReactNode;
}

// Log in to your account

const AuthUI = (props: Props) => {
  const [showCredentialsForm, setShowCredentialsForm] = React.useState(false);
  return (
    <div>
      <section className='flex flex-col md:flex-row h-screen items-center'>
        <div className='w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center'>
          <div className='w-full h-100'>
            <h1 className='text-xl text-rose-700 md:text-2xl font-bold leading-tight mt-12'>
              {props.type === 'login '
                ? 'Log in to your account'
                : 'Register your account'}
            </h1>

            {showCredentialsForm ? (
              <form className='mt-6' action='#' method='POST'>
                {props.children}
              </form>
            ) : (
              <button
                type='button'
                onClick={() => setShowCredentialsForm((preState) => !preState)}
                className='w-full block px-4 py-3 mt-6 text-sm text-white capitalize transition-colors duration-200 bg-rose-700 border rounded-md gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              >
                {props.type === 'register'
                  ? 'register with email'
                  : 'Login with email'}
              </button>
            )}

            <hr className='my-6 border-gray-300 w-full' />
            <div className='flex flex-col gap-2 capitalize'>
              <button
                type='button'
                className='w-full block capitalize bg-white border rounded-md gap-x-2 hover:bg-transparent hover:text-white hover:border-rose-700 active:ring-2 active:ring-rose-700 text-gray-900 font-semibold px-4 py-3'
              >
                <div className='flex items-center justify-center'>
                  <RiTwitterXFill />
                  <span className='ml-4'>
                    {props.type === 'login '
                      ? 'Log in with X'
                      : 'register with X'}
                  </span>
                </div>
              </button>
              <button
                type='button'
                className='w-full block capitalize bg-white border rounded-md gap-x-2 hover:bg-transparent hover:text-white hover:border-rose-700 active:ring-2 active:ring-rose-700 text-gray-900 font-semibold px-4 py-3'
              >
                <div className='flex items-center justify-center'>
                  <FaGithub />
                  <span className='ml-4'>
                    {props.type === 'login '
                      ? 'Log in with Github'
                      : 'register with Github'}
                  </span>
                </div>
              </button>
              <button
                type='button'
                className='w-full block capitalize bg-white border rounded-md gap-x-2 hover:bg-transparent hover:text-white hover:border-rose-700 active:ring-2 active:ring-rose-700 text-gray-900 font-semibold px-4 py-3'
              >
                <div className='flex items-center justify-center'>
                  <FaGoogle />
                  <span className='ml-4'>
                    {props.type === 'login '
                      ? 'Log in with Google'
                      : 'register with Google'}
                  </span>
                </div>
              </button>
            </div>
            {props.type === 'register' ? (
              <p className='mt-8'>
                Need an account?{' '}
                <Link
                  href='/a/register'
                  className='text-rose-500 hover:text-rose-700 font-semibold'
                >
                  Create an account
                </Link>
              </p>
            ) : (
              <p className='mt-8'>
                Have an account?{' '}
                <Link
                  href='/a/login'
                  className='text-rose-500 hover:text-rose-700 font-semibold'
                >
                  Log into account.
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthUI;
