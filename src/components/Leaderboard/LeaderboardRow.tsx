import React from 'react';
import { LeaderboardUser } from './Leaderboard';
import leaderboardL from '../../images/leaderboard-left.svg';
import leaderboardLMe from '../../images/leaderboard-left-me.svg';
import leaderboardR from '../../images/leaderboard-right.svg';

export const LeaderboardRow = (props: { rank: number; player: LeaderboardUser; isCurrentUser: boolean }) => (
  <div className="flex h-[79px] py-1">
    <span style={{ backgroundImage: `url(${props.isCurrentUser ? leaderboardLMe : leaderboardL})` }} className="block w-2 bg-cover" />
    <div className="grid grid-cols-8 items-center gap-2 border-blue-3 bg-blue-3 px-2 text-xs text-white">
      <div className="w-5 text-xs">{props.rank + 1}</div>
      <div className="w-14">
        <span>
          <img className="-ml-3 h-[63px] rounded-lg p-1" src={props.player.picture} alt="" />
        </span>
      </div>
      <div className="col-span-4 ml-2 flex flex-col">
        <span>{props.player.firstName}</span>
        <span>{props.player.lastName}</span>
      </div>
      <div className="col-span-2 text-right">
        <span className="mr-2 -mt-2 font-text text-base text-grey-4">{Math.round(props.player.score.time / 1000)}s</span>
        <span className="align-bottom text-txs text-white">{props.player.score.count}</span>
      </div>
    </div>
    <span style={{ backgroundImage: `url(${leaderboardR})` }} className="block w-2 bg-cover" />
  </div>
);
