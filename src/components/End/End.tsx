import { Link, navigate } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { Button } from '../Button/Button';
import { Metadata } from '../Metadata/Metadata';
import { Toolbar } from "../Toolbar/Toolbar";
import icRestart from "../../images/ic-restart.svg";
import bgLeft from "../../images/bg-result-left.svg";
import bgRight from "../../images/bg-result-right.svg";
import bgHintLeft from "../../images/bg-result-hint-left.svg";
import bgHintRight from "../../images/bg-result-hint-right.svg";
import icLeaderboard from "../../images/ic-leaderboard.svg";
import { GameResult } from "../../services/game";

interface EndPropTypes {
  location: { state?: { gameResult: GameResult, gameType: number } }
}

export const End: FunctionComponent<EndPropTypes> = ({ location }) => {
  if (!location.state) {
    navigate('/');
    return <></>;
  }
  const { gameResult, gameType } = location.state;
  return (
    <main className="h-screen">
      <Metadata/>
      <Toolbar title={`Series ${gameType}`} buttonLabel="Back" link="/app/play-choice"/>
      <div className="flex py-6 px-4 md:h-4/5 justify-center mx-auto max-w-screen-sm items-center">
        <div className="flex h-[356px] w-full">
          <span style={{ backgroundImage: `url(${bgLeft})` }} className="w-[6px] h-[356px] block bg-cover"/>
          <div className="bg-blue-3 flex flex-col text-left px-4 justify-center flex-grow">
            <div className="text-center flex flex-col">
              <h1 className="font-game text-tsm text-white">You scored</h1>
              <span className="font-game text-t8xl text-shadow-3 text-yellow-3 mt-4 mb-6">{gameResult.score}/{gameType}</span>
              <div className="flex h-[70px]">
                <span style={{ backgroundImage: `url(${bgHintLeft})` }} className="w-[6px] h-[70px] block bg-cover"/>
                <div className="bg-blue-2 flex flex-col text-left px-4 justify-center flex-grow">
                  <div className="flex justify-between text-center font-game">
                    <div className="flex flex-col">
                      <span className="text-t2xs text-white">Time</span>
                      <span className="text-tlg text-yellow-3">{gameResult.time}s</span>
                      { gameResult.bestTime && <span className="text-t2xs text-grey-4">Best: {gameResult.bestTime}s</span> }
                    </div>
                    <div className="flex flex-col">
                      <span className="text-t2xs font-game text-white">Rank</span>
                      <span className="text-tlg text-yellow-3">{gameResult.rank}</span>
                      { gameResult.bestRank && <span className="text-t2xs text-grey-4">Best: {gameResult.bestRank}</span> }
                    </div>
                    <div>
                      <Link to={`/app/leaderboard?series=${gameType}`} state={{ ...location.state, from: '/app/end' }}>
                        <Button icon={icLeaderboard}/>
                      </Link>
                    </div>
                  </div>
                </div>
                <span style={{ backgroundImage: `url(${bgHintRight})` }} className="w-[6px] h-[70px] block bg-cover"/>
              </div>
              <div className="mt-4">
                <Link to="/app/play-choice" className="flex-grow" replace>
                  <Button wide disabled>Coming soon!</Button>
                </Link>
              </div>
              <div className="mt-4 flex gap-x-4">
                <Link to={`/app/play?series=${gameType}`} replace>
                  <Button primary icon={icRestart}/>
                </Link>
                <Link to="/app/play-choice" className="flex-grow" replace>
                  <Button wide>Categories</Button>
                </Link>
              </div>
            </div>
          </div>
          <span style={{ backgroundImage: `url(${bgRight})` }} className="w-[6px] h-[356px] block bg-cover"/>
        </div>
      </div>
    </main>
  );
};
