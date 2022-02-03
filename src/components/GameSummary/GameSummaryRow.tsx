import React, { FunctionComponent } from "react";
import { QuestionSummary } from "./GameSummary";
import IcResultCorrect from "../../images/ic-result-correct.svg";
import IcResultWrong from "../../images/ic-result-wrong.svg";

export const GameSummaryRow: FunctionComponent<QuestionSummary> = ({ picture, answers, answerId, solutionId }) => (
  <div className="w-full flex items-stretch">
    <img className="w-[140px] mx-[30px] md:ml-[60px] rounded-md" src={ picture } alt="user's picture"/>

    <div className="w-full grid grid-cols-5 gap-4 content-center items-center">
      <img src={IcResultCorrect} height={24} width={24} alt="Correct Answer"/>
      <div className="font-game text-green-2 text-sm col-span-4">{ `${answers[solutionId].firstName} ${answers[solutionId].lastName}` }</div>
      { answerId !== solutionId && <img src={IcResultWrong} height={24} width={24} alt="Wrong Answer"/> }
      { answerId !== solutionId && <div className="font-game text-red-2 text-sm col-span-4">{ `${answers[answerId].firstName} ${ answers[answerId].lastName}` }</div> }
    </div>
  </div>
);
