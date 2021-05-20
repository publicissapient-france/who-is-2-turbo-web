import React from 'react';
import Logo from '../images/logo.png';
import Idea from '../images/idea.svg';
import {Metadata} from '../components/Metadata/Metadata';

const WaitAuthPage = () => {
  return (
    <main className="flex flex-col container mx-auto text-center justify-center items-center md:h-screen mt-12 md:-mt-12">
      <Metadata/>
      <img className="mb-8" width={195} height={148} src={Logo} alt="whois's logo"/>
      <div className="px-4 text-white">
        <h1 className="font-game mb-2 text-sm md:text-base text-[#F0AF00] text-shadow">
          Thank you for joining<br/>❤️
        </h1>
        <div className="text-xs">
          <p className="pt-6">Please check your mailbox.</p>
          <p>You should receive very soon an email from: </p><span className="font-mono font-bold">{process.env.GATSBY_HELLO_EMAIL}</span>
          <p className="mt-4">See you soon!</p>
          <div className="flex text-left flex-row border rounded-sm p-2 border-gray-300 space-x-2 mt-12 text-[10px]">
            <img src={Idea} height={24} width={24} alt="hint image"/>
            <span>Check your spam folder, maybe the email has been filtered.</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WaitAuthPage;
