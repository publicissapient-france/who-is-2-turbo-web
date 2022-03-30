import React, { FunctionComponent } from 'react';
import { Metadata } from '../Metadata/Metadata';
import { Toolbar } from '../Toolbar/Toolbar';
import useSWR from 'swr';
import { fetcher } from '../../services/fetch';
import { Loading } from '../Loading/Loading';
import { LeaderboardRow } from './LeaderboardRow';
import { Message } from '../Message/Message';
import { isProfileCompleted } from '../../services/profile';
import { User } from '../../services/gallery';

export interface LeaderboardUser {
  firstName: string;
  lastName: string;
  picture?: string;
  score: {
    count: number;
    time: number;
  };
}

const getCurrentUser = () => {
  const { data } = useSWR(`/members/me`, fetcher);
  return {
    me: data,
    isUserLoading: !data,
  };
};

const isItMe = (me: LeaderboardUser, player: LeaderboardUser) => {
  return me.firstName === player.firstName && me.lastName === player.lastName;
};

const useLeaderboard = (type: number) => {
  const { data } = useSWR(`/members/leaderboard?gameType=SERIES_${type}`, fetcher);
  return {
    leaderboard: data && data.map((user: User) => ({ ...user, picture: process.env.GATSBY_API_URL + user.picture })),
    isLoading: !data,
  };
};

export const Leaderboard: FunctionComponent<{ location: { search: any; state?: any } }> = ({ location }) => {
  const query = new URLSearchParams(location.search);
  const gameType = parseInt(query.get('series') || '5', 10);
  const { leaderboard, isLoading } = useLeaderboard(gameType);
  const { me, isUserLoading } = getCurrentUser();
  return (
    <main>
      <Metadata />
      {!isLoading && !isUserLoading ? (
        <>
          <Toolbar title="Leaderboard" buttonLabel="Back" link={location.state.from} state={location.state} />
          {!isProfileCompleted() && (
            <section className="m-6 flex justify-center">
              <Message actionLabel="Create profile" actionLink="/app/profile" />
            </section>
          )}
          <section className="mx-auto mt-6 h-screen max-w-screen-sm font-game md:mt-8">
            <h1 className="text-shadow mb-6 text-center font-game text-tsm text-yellow-3">Series {gameType}</h1>
            {leaderboard.map((player: LeaderboardUser, rank: number) => (
              <LeaderboardRow key={rank} rank={rank} player={player} isCurrentUser={isItMe(me, player)} />
            ))}
          </section>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};
