import * as React from 'react';
import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { getGame, TQuestion } from '../../services/game';
import { Question } from '../Question/Question';

export const Play = () => {
  const [position, setPosition] = useState(0);
  const [game, setGame] = useState<TQuestion[]>([]);

  useEffect(() => {
    const loadGame = async () => {
      const { data: { questions } } = await getGame();
      setGame(questions);
    };
    loadGame();
  }, []);

  const onAnswer = (id: number) => {
    setGame(game.map((question, index) => {
      if (index === position) {
        return { ...question, answerId: id };
      }
      return question;
    }));
    if (position < game.length - 1) {
      setPosition(position + 1);
    } else {
      // TODO get score from service using game
      navigate(`/app/end?score=4&count=5`);
    }
  };

  return (
    <main className="p-4 select-none h-screen">
      <div className="container mx-auto md:max-w-screen-sm flex flex-col sm:justify-center h-full items-center">
        {game[position] && <Question key={game[position].question} {...game[position]} onAnswer={onAnswer}/>}
      </div>
    </main>
  );
};
