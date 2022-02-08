import React from 'react';
import Logo from '../images/logo.png';
import { Metadata } from '../components/Metadata/Metadata';

const WaitAuthPage = () => {
  return (
    <main className="container mx-auto mt-16 flex max-w-screen-sm flex-col items-center justify-center px-6 text-center md:-mt-16 md:h-screen">
      <Metadata />
      <img className="mb-8" src={Logo} alt="whois's logo" />
      <div className="px-4 text-white">
        <h1 className="text-shadow mb-2 font-game text-tlg text-yellow-3">
          Thank you for joining!
          <br />
          ❤️
        </h1>
        <div>
          <p className="pt-6">Please check your mailbox.</p>
          <p>You should receive an email with a link from </p>
          <span className="text-yellow-3">{process.env.GATSBY_HELLO_EMAIL}</span>
          <p className="mt-4">See you soon!</p>
        </div>
      </div>
    </main>
  );
};

export default WaitAuthPage;
