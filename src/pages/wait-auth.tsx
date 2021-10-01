import React from 'react';
import Logo from '../images/logo.png';
import { Metadata } from '../components/Metadata/Metadata';

const WaitAuthPage = () => {
  return (
    <main className="flex flex-col container mx-auto text-center justify-center items-center md:h-screen mt-16 md:-mt-16 px-6 max-w-screen-sm">
      <Metadata/>
      <img className="mb-8" src={Logo} alt="whois's logo"/>
      <div className="px-4 text-white">
        <h1 className="font-game mb-2 text-tlg text-yellow-3 text-shadow">
          Thank you for joining!<br/>❤️
        </h1>
        <div>
          <p className="pt-6">Please check your mailbox.</p>
          <p>You should receive an email with a link from </p><span className="text-yellow-3">{process.env.GATSBY_HELLO_EMAIL}</span>
          <p className="mt-4">See you soon!</p>
        </div>
      </div>
    </main>
  );
};

export default WaitAuthPage;
