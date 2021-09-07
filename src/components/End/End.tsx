import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { Button } from '../Button/Button';
import { Metadata } from '../Metadata/Metadata';

interface EndPropTypes {
  location: Location
}

export const End: FunctionComponent<EndPropTypes> = ({ location }) => {
  const query = new URLSearchParams(location.search);
  return (
    <main className="p-4 h-screen">
      <Metadata/>
      <div className="flex flex-col justify-center items-center md:h-4/5">
        <h1 className="mt-6 mb-4 font-game text-sm md:text-base text-[#F0AF00] text-shadow">Your score!</h1>
        <span className="font-game text-5xl text-shadow-2 text-white mb-14">{query.get('score')}/{query.get('count')}</span>
        <Link to="/app/play-choice" replace>
          <Button>Play again!</Button>
        </Link>
        <Link to="/app/leaderboard" replace>
          <Button>Leaderboard</Button>
        </Link>
        <Link to="/app/gallery" replace>
          <Button>Gallery</Button>
        </Link>
        <Link to="/" replace>
          <span className="text-[#D3D4E9] font-game text-xs mt-6 block">Back to Home</span>
        </Link>
      </div>
    </main>
  );
};
