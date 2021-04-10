import React from 'react';

const WaitAuthPage = () => {
  return (
    <main className="text-center flex flex-col h-screen container items-center">
      <h1 className="font-game mt-12 text-2xl">Welcome</h1>
      <img className="my-8 px-4" src="https://dummyimage.com/600x300/9e189e/fff.jpg&text=LOGO" alt="app's logo"/>
      <div className="px-4">
        <h2 className="text-xl">
          Thank you for joining Whois ❤️
        </h2>
        <p className="pt-6">Please check your mailbox 📬 you should receive very soon an email from <span className="font-mono">{process.env.GATSBY_HELLO_EMAIL}</span></p>
        <p className="mt-4">See you soon on Whois!</p>
        <p className="text-sm mt-8">💡 check you spam folder, maybe the email has been filtered.</p>
      </div>
    </main>
  );
};

export default WaitAuthPage;
