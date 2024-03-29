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

const useCurrentUser = () => {
  const { data } = useSWR(`/members/me`, fetcher);
  return {
    me: data,
    isUserLoading: !data,
  };
};

const isItMe = (me: LeaderboardUser, player: LeaderboardUser) => {
  return me.firstName === player.firstName && me.lastName === player.lastName;
};

const useLeaderboard = (type: string) => {
  const { data } = useSWR(`/members/leaderboard?gameType=${type}`, fetcher);
  return {
    leaderboard: data?.map((user: User) => ({ ...user, picture: process.env.GATSBY_API_URL + user.picture })),
    isLoading: !data,
  };
};

function getSeriesTitle(series: string) {
  if (series === 'SERIES_5') {
    return `5`;
  } else if (series === 'SERIES_20') {
    return `20`;
  } else {
    return series;
  }
}

export const Leaderboard: FunctionComponent<{ location: { search: any; state?: any } }> = ({ location }) => {
  const query = new URLSearchParams(location.search);
  const gameType = query.get('series') ?? 'SERIES_5';
  const { leaderboard, isLoading } = useLeaderboard(gameType);
  const { me, isUserLoading } = useCurrentUser();
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
            <h1 className="text-shadow mb-6 text-center font-game text-tsm text-yellow-3">Series {getSeriesTitle(gameType)}</h1>
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
