import { Link } from 'gatsby';
import * as React from 'react';
import { Button } from '../components/Button/Button';
import { Metadata } from '../components/Metadata/Metadata';
import Logo from "../images/logo.png";

const NotFoundPage = () => {
  return (
    <main className="max-w-xs m-4 text-center flex flex-col container mx-auto text-center justify-center items-center md:h-screen mt-12 md:-mt-12">
      <Metadata/>
      <img className="mb-8" src={Logo} alt="whois's logo"/>
      <h1 className="mb-6 text-white mx-4">You should be signed using your <span className="text-yellow-3">{process.env.GATSBY_ALLOWED_DOMAIN}</span> email to access this
        content.</h1>
      <Link to="/" className="mb-6">
        <Button wide primary>Sign in</Button>
      </Link>
      <p className="text-yellow-3 mx-4">💡 You have to open the received link in the same browser you entered your email.</p>
    </main>
  );
};

export default NotFoundPage;
