import React, { FunctionComponent } from "react";
import { Metadata } from "../Metadata/Metadata";
import { Toolbar } from "../Toolbar/Toolbar";
import useSWR from "swr";
import { fetcher } from "../../services/fetch";
import { Loading } from "../Loading/Loading";
import { LeaderboardRow } from "./LeaderboardRow";
import { Message } from "../Message/Message";
import { isProfileCompleted } from "../../services/profile";

export interface LeaderboardUser {
  firstName: string;
  lastName: string;
  picture?: string
  score: {
    count: number;
    time: number;
  }
}

const useLeaderboard = (type: number) => {
  const { data } = useSWR(`/members/leaderboard?gameType=SERIES_${type}`, fetcher);
  return {
    leaderboard: data,
    isLoading: !data
  }
}

export const Leaderboard: FunctionComponent<{ location: { search: any, state?: any } }> = ({ location }) => {
  const query = new URLSearchParams(location.search);
  const gameType = parseInt(query.get('series') || '5', 10)
  const { leaderboard, isLoading } = useLeaderboard(gameType);
  return (
    <main>
      <Metadata/>
      {!isLoading ? <>
        <Toolbar title="Leaderboard" buttonLabel="Back" link={location.state.from} state={location.state}/>
        {!isProfileCompleted() && <section className="m-6 flex justify-center">
          <Message actionLabel="Create profile" actionLink="/app/profile"/>
        </section>}
        <section className="font-game h-screen max-w-screen-sm mx-auto mt-6 md:mt-8">
          <h1 className="font-game text-tsm text-yellow-3 text-shadow text-center mb-6">Series {gameType}</h1>
          {leaderboard.map((player: LeaderboardUser, rank: number) => <LeaderboardRow key={rank} rank={rank} player={player}/>)}
        </section>
      </> : <Loading/>}
    </main>
  )
}
