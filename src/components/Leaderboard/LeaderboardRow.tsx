import React from "react";
import {LeaderboardUser} from "./Leaderboard";
import leaderboardL from "../../images/leaderboard-left.svg";
import leaderboardLMe from "../../images/leaderboard-left-me.svg";
import leaderboardR from "../../images/leaderboard-right.svg";
import useSWR from "swr";
import {fetcher} from "../../services/fetch";
import {Loading} from "../Loading/Loading";

const currentUser = () => {
  const { data } = useSWR(`/members/me`, fetcher);
  return {
    me: data,
    isLoading: !data
  };
};

export const LeaderboardRow = (props: { rank: number, player: LeaderboardUser }) => {
  const { me, isLoading } = currentUser()
  return (
    <div className="h-[79px] flex py-1">
      {!isLoading ? <>
      {/*  TODO How to differentiate if 2 people have same firstname and lastname */}
      <span style={{backgroundImage: `url(${ me.firstName == props.player.firstName && me.lastName == props.player.lastName ? leaderboardLMe : leaderboardL})`}}
            className="w-2 block bg-cover"/>
      <div className="px-2 grid grid-cols-8 gap-2 text-xs items-center text-white border-blue-3 bg-blue-3">
        <div className="text-sm w-[20px]">{props.rank + 1}</div>
        <div className="w-14">
          <span>
              <img className="p-1 rounded-lg h-[63px] -mx-2" src={props.player.picture} alt=""/>
          </span>
        </div>
        <div className="col-span-4 flex flex-col ml-4">
          <span>{props.player.firstName}</span>
          <span>{props.player.lastName}</span>
        </div>
        <div className="text-right col-span-2">
          <span className="text-base font-text text-grey-4 mr-2 -mt-2">{Math.round(props.player.score.time / 1000)}s</span>
          <span className="text-txs text-white align-bottom">{props.player.score.count}</span>
        </div>
      </div>
      <span style={{backgroundImage: `url(${leaderboardR})`}}
            className="w-2 block bg-cover"/>
      </> : <Loading/>}
    </div>
  )
}
