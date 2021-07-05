import React from "react";
import { Metadata } from "../Metadata/Metadata";
import { Toolbar } from "../Toolbar/Toolbar";
import useSWR from "swr";
import { fetcher } from "../../services/fetch";
import { Loading } from "../Loading/Loading";
import { LeaderboardRow } from "./LeaderboardRow";
import { LeaderboardUser } from "../../services/leaderboard";

const useLeaderboard = () => {
  const { data } = useSWR(`/members/leaderboard`, fetcher);
  return {
    leaderboard: data,
    isLoading: !data
  }
}

export const Leaderboard = () => {
  const { leaderboard, isLoading } = useLeaderboard();
  return (
    <main className="mb-4 lg:mb-12">
      <Metadata/>
      <Toolbar title="Leaderboard" buttonLabel="Back"/>
      <section className="font-game h-screen max-w-md mx-auto md:mt-8">
        <div className="px-4 grid grid-cols-4 md:grid-cols-6 gap-4 text-xs h-10 items-center text-white uppercase bg-[#060968]">
          <div>rank</div>
          <div className="col-span-2 md:col-span-4">player</div>
          <div className="text-right">score</div>
        </div>
        {isLoading ? <section className="flex justify-center items-center h-3/4"><Loading/></section> :
          leaderboard.map((player: LeaderboardUser, rank: number) => <LeaderboardRow rank={rank} player={player}/>)}
      </section>
    </main>
  )
}
