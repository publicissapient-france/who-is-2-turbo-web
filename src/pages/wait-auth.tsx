import React from 'react';
import Logo from '../images/logo.png';
import Idea from '../images/idea.svg';

const WaitAuthPage = () => {
  return (
    <main className="text-center flex flex-col h-screen container items-center mx-auto">
      <img className="my-8 px-4" src={Logo} alt="whois's logo"/>
      <div className="px-4 text-white">
        <h2 className="font-game mt-8 text-l text-[#F0AF00] text-shadow">
          Thank you for joining<br/>❤️
        </h2>
        <div className="text-sm">
          <p className="pt-6">Please check your mailbox.</p>
          <p>You should receive very soon an email from: </p><span className="font-mono">{process.env.GATSBY_HELLO_EMAIL}</span>
          <p className="mt-4">See you soon!</p>
          <div className="flex text-left flex-row border rounded-sm p-2 border-gray-300 space-x-2 mt-12">
            <img src={Idea} height={24} width={24} alt="hint image"/>
            <span>Check your spam folder, maybe the email has been filtered.</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WaitAuthPage;
