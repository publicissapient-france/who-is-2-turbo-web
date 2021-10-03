import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { Button } from '../Button/Button';
import { Metadata } from '../Metadata/Metadata';
import icPlay from "../../images/ic-play.svg";

interface EndPropTypes {
  location: Location
}

export const End: FunctionComponent<EndPropTypes> = ({ location }) => {
  const query = new URLSearchParams(location.search);
  const score = query.get('score');
  const count = query.get('count');
  const state = { from: `/app/end?score=${score}&count=${count}&series=${query.get('series')}` };
  return (
    <main className="p-4 h-screen">
      <Metadata/>
      <div className="text-center flex flex-col justify-center md:h-4/5 mx-auto max-w-screen-sm">
        <h1 className="mt-6 mb-4 font-game text-tlg text-yellow-3 text-shadow">Your score!</h1>
        <span className="font-game text-[48px] text-shadow-2 text-white mb-16 mt-6">{score}/{count}</span>
        <Link className="mb-2" to="/app/play-choice" replace>
          <Button wide primary icon={icPlay}>Play again!</Button>
        </Link>
        <Link className="mb-2" to={`/app/leaderboard?series=${query.get('series')}`} state={state}>
          <Button wide>Leaderboard</Button>
        </Link>
        <Link className="mb-2" to="/app/gallery" state={state}>
          <Button wide>Gallery</Button>
        </Link>
        <Link className="mb-2" to="/" replace>
          <Button wide>Home</Button>
        </Link>
      </div>
    </main>
  );
};
