
import RegisterAuth from '@/components/auth/register';
import { Params } from '@/interface';
import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

const AuthenticationPage = (props:InferGetServerSidePropsType<typeof getStaticProps>) => {
  console.log(props);
  
    switch (props.auth) {
        case 'register':
            
           return <RegisterAuth authPage={props.auth} />;
           
           default:
               
               return <>Login Component</>
    }
};

export default AuthenticationPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const authPaths = ['register', 'login'].map((auth) => ({ params: { auth } }));
  return { paths: authPaths, fallback: true };
};

export const getStaticProps: GetStaticProps<{ auth: string }> = async (context) => {
  const { auth }: any = context.params as Params;
  return {
    props: {
      auth,
    },
  };
};
