import { Link, navigate } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { Button } from '../Button/Button';
import { GameSummary } from '../GameSummary/GameSummary';
import { Metadata } from '../Metadata/Metadata';
import { Toolbar } from '../Toolbar/Toolbar';
import icRestart from '../../images/ic-restart.svg';
import bgLeft from '../../images/bg-result-left.svg';
import bgRight from '../../images/bg-result-right.svg';
import bgHintLeft from '../../images/bg-result-hint-left.svg';
import bgHintRight from '../../images/bg-result-hint-right.svg';
import icLeaderboard from '../../images/ic-leaderboard.svg';
import { GameResult, TQuestion } from '../../services/game';
import { Drawer } from '../Drawer/Drawer';
import { EndPath, EndWithSummaryPath } from '../../pages/app';

interface EndPropTypes {
  location: { state?: { questions: TQuestion[]; gameResult: GameResult; gameType: number } };
}

export const End: FunctionComponent<EndPropTypes> = ({ location }) => {
  if (!location.state) {
    navigate('/');
    return <></>;
  }
  const { questions, gameResult, gameType } = location.state;
  const gameSummaryDisplayed = window.location.pathname === EndWithSummaryPath;
  const displayGameSummary = () => navigate(EndWithSummaryPath, { replace: false, state: { questions, gameResult, gameType } });
  const hideGameSummary = () => navigate(EndPath, { replace: true, state: { questions, gameResult, gameType } });

  return (
    <main className="h-screen">
      <Metadata />
      <Drawer title="Game Summary" display={gameSummaryDisplayed} onCloseClick={hideGameSummary}>
        <GameSummary questions={questions} gameResult={gameResult} />
      </Drawer>
      <Toolbar title={`Series ${gameType}`} buttonLabel="Back" link="/app/play-choice" />
      <div className="mx-auto flex max-w-screen-sm items-center justify-center py-6 px-4 md:h-4/5">
        <div className="flex h-[356px] w-full">
          <span style={{ backgroundImage: `url(${bgLeft})` }} className="block h-[356px] w-[6px] bg-cover" />
          <div className="flex flex-grow flex-col justify-center bg-blue-3 px-4 text-left">
            <div className="flex flex-col text-center">
              <h1 className="font-game text-tsm text-white">You scored</h1>
              <span className="text-shadow-3 mt-4 mb-6 font-game text-t8xl text-yellow-3">
                {gameResult.score}/{gameType}
              </span>
              <div className="flex h-[70px]">
                <span style={{ backgroundImage: `url(${bgHintLeft})` }} className="block h-[70px] w-[6px] bg-cover" />
                <div className="flex flex-grow flex-col justify-center bg-blue-2 px-4 text-left">
                  <div className="flex justify-between text-center font-game">
                    <div className="flex flex-col">
                      <span className="text-t2xs text-white">Time</span>
                      <span className="text-tlg text-yellow-3">{gameResult.time}s</span>
                      {gameResult.bestTime && <span className="text-t2xs text-grey-4">Best: {gameResult.bestTime}s</span>}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-game text-t2xs text-white">Rank</span>
                      <span className="text-tlg text-yellow-3">{gameResult.rank}</span>
                      {gameResult.bestRank && <span className="text-t2xs text-grey-4">Best: {gameResult.bestRank}</span>}
                    </div>
                    <div>
                      <Link to={`/app/leaderboard?series=${gameType}`} state={{ ...location.state, from: '/app/end' }}>
                        <Button icon={icLeaderboard} />
                      </Link>
                    </div>
                  </div>
                </div>
                <span style={{ backgroundImage: `url(${bgHintRight})` }} className="block h-[70px] w-[6px] bg-cover" />
              </div>
              <div onClick={displayGameSummary} className="mt-4 flex-grow">
                <Button wide>Game summary</Button>
              </div>
              <div className="mt-4 flex gap-x-4">
                <Link to={`/app/play?series=${gameType}`} replace>
                  <Button primary icon={icRestart} />
                </Link>
                <Link to="/app/play-choice" className="flex-grow" replace>
                  <Button wide>Categories</Button>
                </Link>
              </div>
            </div>
          </div>
          <span style={{ backgroundImage: `url(${bgRight})` }} className="block h-[356px] w-[6px] bg-cover" />
        </div>
      </div>
    </main>
  );
};
