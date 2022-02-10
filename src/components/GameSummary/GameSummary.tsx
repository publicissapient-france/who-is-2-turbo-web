import React, { FunctionComponent } from 'react';
import { Answer, GameResult, TQuestion } from '../../services/game';
import { GameSummaryRow } from './GameSummaryRow';

interface GameSummaryPropTypes {
  questions: TQuestion[];
  gameResult: GameResult;
}

export interface QuestionSummary {
  picture: string;
  answers: Answer[];
  answerId: number;
  solutionId: number;
}

export const GameSummary: FunctionComponent<GameSummaryPropTypes> = ({ questions, gameResult }) => {
  const questionSummaries: QuestionSummary[] = questions
    .map((question, index) => {
      return {
        picture: question.picture,
        answers: question.answers,
        answerId: question.answerId!,
        solutionId: gameResult.solutions[index],
      } as QuestionSummary;
    })
    .sort((summary, otherSummary) => {
      const summaryWeight = summary.answerId === summary.solutionId ? 1 : 0;
      const otherSummaryWeight = otherSummary.answerId === otherSummary.solutionId ? 1 : 0;
      return otherSummaryWeight - summaryWeight;
    });

  return (
    <div className="mb-10 flex flex-col items-center gap-3 md:gap-2 lg:gap-7">
      {questionSummaries.map((summary: QuestionSummary) => (
        <GameSummaryRow key={summary.picture} {...summary} />
      ))}
    </div>
  );
};
