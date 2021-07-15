import React from "react";
import { LeaderboardUser } from "./Leaderboard";

export const LeaderboardRow = (props: { rank: number, player: LeaderboardUser }) =>
  <div
    className="px-4 grid grid-cols-4 md:grid-cols-6 h-[54px] gap-4 text-xs flex items-center text-white border-b border-[#060968]">
    <div className="text-sm">{props.rank + 1}.</div>
    <div className="col-span-2 md:col-span-4 flex flex-col">
      <span>{props.player.firstName}</span>
      <span>{props.player.lastName}</span>
    </div>
    <div className="text-right">
      {props.player.score}
    </div>
  </div>;
