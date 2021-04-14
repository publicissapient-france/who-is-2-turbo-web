import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { Button } from '../Button/Button';

interface EndPropTypes {
  location: Location
}

export const End: FunctionComponent<EndPropTypes> = ({ location }) => {
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
      <Link to="/app/play/">
        <Button>Play again</Button>
      </Link>
    </main>
  );
};
