import React from 'react';
import { Button } from '../Button/Button';
import bgGameSm from '../../images/bg-game-sm.png';
import bgGameMd from '../../images/bg-game-md.png';
import { TQuestion } from '../../services/game';

type QuestionPropTypes = TQuestion & {
  onAnswer: (id: number) => void
}

export const Question = ({ picture, answers, onAnswer }: QuestionPropTypes) => (
  <div className="flex flex-col">
    <div>
      <div className="relative h-[251px] w-[288px] mb-4 md:hidden">
        <img className="absolute inset-0 mx-auto rounded mt-5" src={picture} alt="user's picture" height={186} width={141}/>
        <img className="absolute inset-0" src={bgGameSm} alt="game's retro background" height={251} width={288}/>
      </div>
      <div className="hidden md:block relative h-[449px] w-[434px] mb-4">
        <img className="absolute inset-0 mx-auto rounded mt-[1.6rem]" src={picture} alt="user's picture" height={378} width={284}/>
        <img className="absolute inset-0" src={bgGameMd} alt="game's retro background" height={449} width={434}/>
      </div>
    </div>
    {answers.map((answer, id) => (
      <div className="mb-2">
        <Button wide onClick={() => onAnswer(id)} key={id}>{answer.firstName} {answer.lastName}</Button>
      </div>
    ))}
  </div>
);
