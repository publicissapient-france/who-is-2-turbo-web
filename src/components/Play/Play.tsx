import * as React from 'react';
import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { getGame, getScore, TQuestion } from '../../services/game';
import { Question } from '../Question/Question';

export const Play = () => {
  const [position, setPosition] = useState(0);
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  const [gameId, setGameId] = useState<string>('');

  useEffect(() => {
    const loadGame = async () => {
      const { id, questions } = await getGame();
      setQuestions(questions);
      setGameId(id);
    };
    loadGame();
  }, []);

  const onAnswer = async (id: number) => {
    questions[position] = { ...questions[position], answerId: id };
    if (position < questions.length - 1) {
      setPosition(position + 1);
    } else {
      const { score, count } = await getScore(gameId, questions.map(question => question.answerId || 0));
      navigate(`/app/end?score=${score}&count=${count}`);
    }
  };

  return (
    <main className="p-4 select-none h-screen">
      <div className="container mx-auto md:max-w-screen-sm flex flex-col sm:justify-center h-full items-center">
        {questions[position] && <Question key={questions[position].picture} {...questions[position]} onAnswer={onAnswer}/>}
      </div>
    </main>
  );
};
