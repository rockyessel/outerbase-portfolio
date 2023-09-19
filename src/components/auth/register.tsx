import React from 'react';
import AuthUI from './ui';

interface Props {
  authPage: string;
}

const RegisterAuth = (props: Props) => {
  const [authForm, setAuthForm] = React.useState({ email: '', password: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setAuthForm((authFormValues) => ({
      ...authFormValues,
      [target.name]: target.value,
    }));
  };

  return (
    <AuthUI type={props.authPage}>
      <fieldset>
        <label className='block'>Email Address</label>
        <input
          type='email'
          name='email'
          onChange={handleChange}
          placeholder='Enter Email Address'
          className='appearance-none block w-full py-3 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          required
        />
      </fieldset>

      <fieldset className='mt-4'>
        <label className='block'>Password</label>
        <input
          type='password'
          name='password'
          onChange={handleChange}
          placeholder='Enter Password'
          className='appearance-none block w-full py-3 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          required
        />
      </fieldset>

      <button
        type='submit'
        className='w-full block px-4 py-3 mt-6 text-sm text-white capitalize transition-colors duration-200 bg-rose-700 border rounded-md gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
      >
        {props.authPage === 'register'
          ? 'register with email'
          : 'Login with email'}
      </button>
    </AuthUI>
  );
};

export default RegisterAuth;
