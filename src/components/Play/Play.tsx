import * as React from 'react';
import { useEffect, useState } from 'react';
import { Question, QuestionType } from '../Question/Question';
import { navigate } from 'gatsby';

const gameFromService = [
  {
    picture: 'https://dummyimage.com/600x800/9e189e/fff.jpg&text=3:4',
    answers: ['Camron Duggan', 'August Handley', 'Nathan Blackmore', 'Taryn Perry']
  },
  {
    picture: 'https://dummyimage.com/600x800/9e189e/fff.jpg&text=3:4',
    answers: ['King Connolly', 'Moses Mccallum', 'Eliot Cartwright', 'Sunil Phelps']
  },
  {
    picture: 'https://dummyimage.com/600x800/9e189e/fff.jpg&text=3:4',
    answers: ['Luis Goff', 'Kelise Hanna', 'Jobe Mata', 'Aimie Navarro']
  },
  {
    picture: 'https://dummyimage.com/600x800/9e189e/fff.jpg&text=3:4',
    answers: ['Huseyin Halliday', 'Cayson Barrera', 'Junior Cherry', 'Derren Howe']
  },
  {
    picture: 'https://dummyimage.com/600x800/9e189e/fff.jpg&text=3:4',
    answers: ['Latisha Howard', 'Sami Allan', 'Sami Allan', 'Ariadne Lynn']
  }
];

export const Play = () => {
  const [position, setPosition] = useState(0);
  const [game, setGame] = useState<QuestionType[]>([]);

  useEffect(() => {
    // TODO get game from service
    setGame(gameFromService);
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
        {game[position] && <Question key={game[position].picture} {...game[position]} onAnswer={onAnswer}/>}
      </div>
    </main>
  );
};
