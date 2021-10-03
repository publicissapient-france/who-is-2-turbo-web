import React from "react";
import { LeaderboardUser } from "./Leaderboard";

export const LeaderboardRow = (props: { rank: number, player: LeaderboardUser }) =>
  <div
    className="px-4 grid grid-cols-6 h-[54px] gap-2 text-xs flex items-center text-white border-b border-[#060968]">
    <div className="text-sm">{props.rank + 1}.</div>
    <div className="col-span-3 flex flex-col">
      <span>{props.player.firstName}</span>
      <span>{props.player.lastName}</span>
    </div>
    <div className="text-right col-span-2">
      <span className="text-base font-text text-grey-4 mr-2 -mt-2">{Math.round(props.player.score.time / 1000)}s</span>
      <span className="text-txs text-white align-bottom">{props.player.score.count}</span>
    </div>
  </div>;
