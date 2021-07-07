import * as React from 'react';
import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { getGame, getScore, TQuestion } from '../../services/game';
import { Question } from '../Question/Question';
import { Metadata } from '../Metadata/Metadata';
import { Toolbar } from "../Toolbar/Toolbar";
import { Loading } from "../Loading/Loading";

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
      navigate(`/app/end?score=${score}&count=${count}`, { replace: true });
    }
  };

  return (
    <main className="select-none h-screen">
      <Metadata/>
      {!questions[position] && <Loading/>}
      {questions[position] && <>
        <Toolbar title="Series 5" buttonLabel="Abort"/>
        <section className="md:flex md:h-4/5 md:justify-center md:items-center">
          <div className="mt-4 flex flex-col items-center">
            {questions[position] && <Question key={questions[position].picture} {...questions[position]} onAnswer={onAnswer}/>}
          </div>
        </section>
      </>}
    </main>
  );
};
