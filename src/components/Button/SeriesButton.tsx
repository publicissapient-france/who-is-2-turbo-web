import cardL from '../../images/card-left.svg';
import cardR from '../../images/card-right.svg';
import React, { FunctionComponent } from 'react';
import { Button } from "./Button";
import { Link } from 'gatsby';
import icLeaderboard from "../../images/ic-leaderboard.svg";
import icPlay from "../../images/ic-play.svg";

type BigButtonPropTypes = {
  series: number
}

export const SeriesButton: FunctionComponent<BigButtonPropTypes> = ({ series }) => (
  <div className="flex h-40">
    <img src={cardL} className="h-full"/>
    <div className="bg-blue-3 flex flex-col text-left px-4 justify-center flex-grow">
      <p className="font-game text-tlg text-yellow-3 text-shadow-3">Series {series}</p>
      <p className="text-white text-sm mt-1">Match {series} faces to their names</p>
      <div className="mt-4 flex gap-x-4">
        <Link to={`/app/leaderboard?series=${series}`}>
          <Button icon={icLeaderboard}/>
        </Link>
        <Link to={`/app/play?series=${series}`} className="flex-grow">
          <Button wide primary icon={icPlay}>Play!</Button>
        </Link>
      </div>
    </div>
    <img src={cardR} className="h-full"/>
  </div>
);
