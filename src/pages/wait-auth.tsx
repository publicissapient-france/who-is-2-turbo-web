import React from 'react';
import Logo from '../images/logo.png';

const WaitAuthPage = () => {
  return (
    <main className="text-center flex flex-col h-screen container items-center">
      <img className="my-8 px-4" src={Logo} alt="whois's logo"/>
      <div className="px-4 text-white">
        <h2 className="font-game mt-8 text-l text-[#F0AF00] text-shadow">
          Thank you for joining<br/>❤️
        </h2>
        <p className="pt-6">Please check your mailbox.</p>
        <p>You should receive very soon an email from: </p><span className="font-mono">{process.env.GATSBY_HELLO_EMAIL}</span>
        <p className="mt-4">See you soon!</p>
      </div>
    </main>
  );
};

export default WaitAuthPage;
