import cardL from '../../images/card-left.svg';
import cardR from '../../images/card-right.svg';
import React, { FunctionComponent } from 'react';
import { Button } from './Button';
import { Link } from 'gatsby';
import icLeaderboard from '../../images/ic-leaderboard.svg';
import icPlay from '../../images/ic-play.svg';

type BigButtonPropTypes = {
  series: string;
};

export const SeriesButton: FunctionComponent<BigButtonPropTypes> = ({ series }) => (
  <div className="flex h-40 max-w-64">
    <span style={{ backgroundImage: `url(${cardL})` }} className="block h-40 w-2 bg-cover" />
    <div className="flex flex-grow flex-col justify-center bg-blue-3 px-4 text-left">
      <p className="text-shadow-3 font-game text-tlg text-yellow-3">Series {getSeriesTitle(series)}</p>
      <p className="mt-1 text-sm text-white">{getTextToDisplay(series)}</p>
      <div className="mt-4 flex gap-x-4">
        <Link to={`/app/leaderboard?series=${series}`} state={{ from: '/app/play-choice' }}>
          <Button icon={icLeaderboard} />
        </Link>
        <Link to={`/app/play?series=${series}`} className="flex-grow" replace>
          <Button wide primary icon={icPlay}>
            Play!
          </Button>
        </Link>
      </div>
    </div>
    <span style={{ backgroundImage: `url(${cardR})` }} className="block h-40 w-2 bg-cover" />
  </div>
);

function getSeriesTitle(series: string) {
  if (series === 'SERIES_5') {
    return `5`;
  } else if (series === 'SERIES_20') {
    return `20`;
  } else {
    return series;
  }
}

function getTextToDisplay(series: string) {
  switch (series) {
    case 'SERIES_5':
      return `Match 5 faces to their names`;
    case 'SERIES_20':
      return `Match 20 faces to their names`;
    case 'ALL':
      return `Match every face from Publicis Sapient to its name`;
    default:
      return `Match 5 faces from ${series} capability to their names`;
  }
}
