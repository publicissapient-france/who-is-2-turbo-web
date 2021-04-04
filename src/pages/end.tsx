import { Link, PageProps } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { Button } from '../components/Button/Button';

const EndPage: FunctionComponent<PageProps> = ({ location }) => {
  const query = new URLSearchParams(location.search);
  return (
    <main className="p-4 container mx-auto md:max-w-screen-sm text-center select-none h-screen sm:flex sm:flex-col sm:justify-center">
      <h1 className="text-xl my-6 uppercase text-2xl font-game">Results</h1>
      <div className="my-8 font-text mb-16">
        Good answers:
        <div>
          {query.get('score')}/{query.get('count')}
        </div>
      </div>
      <Link to="/play">
        <Button>Play again</Button>
      </Link>
    </main>
  );
};

export default EndPage;
