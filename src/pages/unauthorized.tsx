import {Link} from 'gatsby';
import * as React from 'react';
import {Button} from '../components/Button/Button';
import {Metadata} from '../components/Metadata/Metadata';

const NotFoundPage = () => {
  return (
    <main className="max-w-xs m-4 text-center flex flex-col container mx-auto text-center justify-center items-center md:h-screen mt-12 md:-mt-12">
      <Metadata/>
      <h1 className="mt-12 mb-14 text-white mx-4">You should be signed using your <span className="font-mono">{process.env.GATSBY_ALLOWED_DOMAIN}</span> email to access this
        content.</h1>
      <Link to="/">
        <Button>Sign in</Button>
      </Link>
      <p className="text-sm text-[#F0AF00] mx-4">💡 You have to open the received link in the same browser you entered your email.</p>
    </main>
  );
};

export default NotFoundPage;
