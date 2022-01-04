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

export const getGame: (type: number) => Promise<Game> = async (type: number) => {
  const { data } = await axios.post<GameEntity>('/games', {
    gameType: `SERIES_${type}`
  });
  return {
    ...data,
    questions: data.questions.map(q => ({
      picture: q.question,
      answers: q.propositions
    }))
  };
};

interface ResultEntity {
  readonly currentScore: {
    readonly count: number;
    readonly time: number;
  }
  readonly previousBestScore: {
    readonly time: number;
  }
  readonly betterScoresInLeaderboard: number;
}

export interface GameResult {
  readonly score: number;
  readonly time: number;
  readonly rank: number;
  readonly bestTime: number;
}

export const getScore: (gameId: string, answers: number[]) => Promise<GameResult> = async (gameId: string, answers: number[]) => {
  const { data: { currentScore, previousBestScore, betterScoresInLeaderboard } } = await axios.post<ResultEntity>(`/games/${gameId}/score`, { answers: answers });
  return {
    score: currentScore.count,
    time: Math.round(currentScore.time / 1000),
    rank: betterScoresInLeaderboard + 1,
    bestTime: Math.round(previousBestScore.time / 1000),
  };
};
