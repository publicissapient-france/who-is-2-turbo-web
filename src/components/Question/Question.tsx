import * as React from 'react';

export type QuestionType = {
  picture: string;
  answerId?: number;
  answers: string[]
}

type QuestionPropTypes = QuestionType & {
  onAnswer: (id: number) => void
}

export const Question = ({ picture, answers, onAnswer }: QuestionPropTypes) => (
  <>
    <img className="rounded object-cover w-full mx-auto h-72 max-w-sm sm:mb-8" src={picture} height={288} width={288} alt="user's picture"/>
    {answers.map((answer, id) => (
      <button key={answer + id} onClick={() => onAnswer(id)} className="mt-4 py-2 w-full bg-gray-300 hover:bg-gray-200 rounded font-game text-xs">{answer}</button>
    ))}
  </>
);
