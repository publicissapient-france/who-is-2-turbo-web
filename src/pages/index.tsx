import React from 'react';
import { Link } from 'gatsby';
import { Button } from '../components/Button/Button';

const IndexPage = () => {
  return (
    <main className="text-center flex flex-col h-screen">
      <h1 className="font-game mt-12 text-2xl">Welcome</h1>
      <Link to="/play" className="mt-16">
        <Button>Play</Button>
      </Link>
      <Link to="/gallery" className="mt-2">
        <Button>Gallery</Button>
      </Link>
    </main>
  );
};

export default IndexPage;
