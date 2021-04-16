import axios from 'axios';

export interface Answer {
  readonly firstName: string
  readonly lastName: string
}

export interface TQuestion {
  readonly picture: string
  readonly answers: Answer[]
  readonly answerId?: number
}

interface QuestionEntity {
  readonly question: string
  readonly propositions: Answer[]
}

interface GameEntity {
  readonly id: string
  readonly questions: QuestionEntity[]
}

export interface Game {
  readonly id: string
  readonly questions: TQuestion[]
}

export const getGame: () => Promise<Game> = async () => {
  const { data } = await axios.post<GameEntity>(`${process.env.GATSBY_API_URL}/games`);
  return {
    ...data,
    questions: data.questions.map(q => ({
      picture: q.question,
      answers: q.propositions
    }))
  };
};

interface ResultEntity {
  readonly correct: number
  readonly total: number
}

interface Result {
  readonly score: number;
  readonly count: number;
}

export const getScore: (gameId: string, answers: number[]) => Promise<Result> = async (gameId: string, answers: number[]) => {
  const { data: { correct, total } } = await axios.post<ResultEntity>(`${process.env.GATSBY_API_URL}/games/${gameId}/score`, { answers: answers });
  return {
    score: correct,
    count: total
  };
};
