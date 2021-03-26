import React from 'react';
import { Button } from '../Button/Button';

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
    <img className="rounded object-cover w-full mx-auto h-72 mb-4 max-w-sm sm:mb-8" src={picture} height={288} width={288} alt="user's picture"/>
    {answers.map((answer, id) => (
      <Button onClick={() => onAnswer(id)}>{answer}</Button>
    ))}
  </>
);
