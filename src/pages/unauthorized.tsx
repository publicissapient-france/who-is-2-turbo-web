import { Link } from 'gatsby';
import * as React from 'react';
import { Button } from '../components/Button/Button';
import { Metadata } from '../components/Metadata/Metadata';
import Logo from '../images/logo.png';

const NotFoundPage = () => {
  return (
    <main className="container m-4 mx-auto mt-12 flex max-w-xs flex-col items-center justify-center text-center text-center md:-mt-12 md:h-screen">
      <Metadata />
      <img className="mb-8" src={Logo} alt="whois's logo" />
      <h1 className="mx-4 mb-6 text-white">
        You should be signed using your <span className="text-yellow-3">{process.env.GATSBY_ALLOWED_DOMAIN}</span> email to access this content.
      </h1>
      <Link to="/" className="mb-6">
        <Button wide primary>
          Sign in
        </Button>
      </Link>
        {process.env.GATSBY_GAUTH !== 'true' &&
          <p className="mx-4 text-yellow-3">💡 You have to open the received link in the same browser you entered your email.</p>
        }
    </main>
  );
};

export default NotFoundPage;
