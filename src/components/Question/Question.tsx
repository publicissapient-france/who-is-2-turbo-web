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
  <div className="flex flex-col items-center">
    <img className="rounded object-cover w-full h-72" src={picture} height={288} width={288} alt="user's picture"/>
    {answers.map((answer, id) => (
      <button onClick={() => onAnswer(id)} className="mt-4 py-2 w-full bg-gray-100 hover:bg-gray-200 rounded">{answer}</button>
    ))}
  </div>
);
