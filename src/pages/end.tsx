import { Link, PageProps } from 'gatsby';
import React, { FunctionComponent } from 'react';

const EndPage: FunctionComponent<PageProps> = ({ location }) => {
  const query = new URLSearchParams(location.search);
  return (
    <main className="p-4 container mx-auto md:max-w-screen-md text-center select-none">
      <h1 className="text-xl my-6">Results</h1>
      <div className="my-8">
        Good answers:
        <div>
          {query.get('score')}/{query.get('count')}
        </div>
      </div>
      <Link to="/">
        <button className="mt-4 py-2 w-full bg-gray-100 hover:bg-gray-200 rounded">Play again</button>
      </Link>
    </main>
  );
};

export default EndPage;
