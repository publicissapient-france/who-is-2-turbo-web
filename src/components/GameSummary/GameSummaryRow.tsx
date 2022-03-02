import React, { FunctionComponent } from 'react';
import { QuestionSummary } from './GameSummary';
import IcResultCorrect from '../../images/ic-result-correct.svg';
import IcResultWrong from '../../images/ic-result-wrong.svg';

export const GameSummaryRow: FunctionComponent<QuestionSummary> = ({ picture, answers, answerId, solutionId }) => (
  <div className="flex w-full items-stretch">
    <img className="mx-7 w-36 rounded-md md:ml-14" src={picture} alt="user's picture" />

    <div className="flex flex-col justify-center gap-2">
      <div className="flex w-full grid-cols-5 content-center items-center gap-2">
        <img src={IcResultCorrect} height={24} width={24} alt="Correct Answer" />
        <div className="col-span-4 font-game text-sm text-green-2">{`${answers[solutionId].firstName} ${answers[solutionId].lastName}`}</div>
      </div>
      {answerId !== solutionId && (
        <div className="flex w-full grid-cols-5 content-center items-center gap-2">
          <img src={IcResultWrong} height={24} width={24} alt="Wrong Answer" />
          <div className="col-span-4 font-game text-sm text-red-2">{`${answers[answerId].firstName} ${answers[answerId].lastName}`}</div>
        </div>
      )}
    </div>
  </div>
);
