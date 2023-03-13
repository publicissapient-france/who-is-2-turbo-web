import React from 'react';
import { Button } from '../Button/Button';
import bgGameSm from '../../images/bg-game-sm.png';
import bgGameMd from '../../images/bg-game-md.png';
import { TQuestion } from '../../services/game';

type QuestionPropTypes = TQuestion & {
  onAnswer: (id: number) => void;
};

export const Question = ({ picture, answers, onAnswer }: QuestionPropTypes) => (
  <div className="flex flex-col">
    <div>
      <div className="relative mb-4 h-[251px] w-[288px] md:hidden">
        <img className="absolute inset-0 mx-auto mt-5 rounded" src={picture} alt="user's picture" height={186} width={141} />
        <img className="absolute inset-0" src={bgGameSm} alt="game's retro background" height={251} width={288} />
      </div>
      <div className="relative mb-4 hidden h-[449px] w-[434px] md:block">
        <img className="absolute inset-0 mx-auto mt-[1.6rem] rounded" src={picture} alt="user's picture" height={378} width={284} />
        <img className="absolute inset-0" src={bgGameMd} alt="game's retro background" height={449} width={434} />
      </div>
    </div>
    {answers.map((answer, id) => (
      <div className="mb-2" key={id}>
        <Button count={id} wide capitalize onClick={() => onAnswer(id)}>
          {answer.firstName} {answer.lastName}
        </Button>
      </div>
    ))}
  </div>
);
