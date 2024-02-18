import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { getGame, getScore, TQuestion } from '../../services/game';
import { Question } from '../Question/Question';
import { Metadata } from '../Metadata/Metadata';
import { Toolbar } from '../Toolbar/Toolbar';
import { Loading } from '../Loading/Loading';
import { EndPath } from '../../pages/app';
import { preloadImage } from '../../services/common';

interface PlayPropTypes {
  location: Location;
}

export const Play: FunctionComponent<PlayPropTypes> = ({ location }) => {
  const query = new URLSearchParams(location.search);
  const gameType = query.get('series') ?? 'SERIES_5';
  const [position, setPosition] = useState(0);
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  const [gameId, setGameId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGame = async () => {
      const { id, questions } = await getGame(gameType);
      setQuestions(questions);
      questions.forEach((question, index) => {
        return preloadImage(question.picture, questions, index, () => {
          setQuestions(questions);
          setGameId(id);
          setLoading(false);
        });
      });
    };
    loadGame();
  }, []);

  const onAnswer = async (id: number) => {
    questions[position] = { ...questions[position], answerId: id };
    if (position < questions.length - 1) {
      setPosition(position + 1);
    } else {
      setLoading(true);
      const gameResult = await getScore(
        gameId,
        questions.map((question) => question.answerId || 0),
      );
      navigate(EndPath, { replace: true, state: { questions, gameResult, gameType } });
    }
  };

  return (
    <main className="h-screen select-none">
      <Metadata />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Toolbar title={`Series ${gameType}`} buttonLabel="Abort" />
          <section className="md:flex md:h-4/5 md:items-center md:justify-center">
            <div className="mt-4 flex flex-col items-center">
              {questions[position] && <Question key={questions[position].picture} {...questions[position]} onAnswer={onAnswer} />}
            </div>
          </section>
        </>
      )}
    </main>
  );
};
