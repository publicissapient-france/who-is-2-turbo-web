import axios from 'axios';

export interface Answer {
  readonly firstName: string;
  readonly lastName: string;
}

export interface TQuestion {
  readonly picture: string;
  readonly answers: Answer[];
  readonly answerId?: number;
}

interface QuestionEntity {
  readonly question: string;
  readonly propositions: Answer[];
}

interface GameEntity {
  readonly id: string;
  readonly questions: QuestionEntity[];
}

export interface Game {
  readonly id: string;
  readonly questions: TQuestion[];
}

export const getGame: (type: number) => Promise<Game> = async (type: number) => {
  const { data } = await axios.post<GameEntity>('/games', {
    gameType: `SERIES_${type}`,
  });
  return {
    ...data,
    questions: data.questions.map((q) => ({
      picture: q.question,
      answers: q.propositions,
    })),
  };
};

interface ResultEntity {
  readonly score: {
    readonly count: number;
    readonly time: number;
  };
  readonly bestScore:
    | {
        readonly count: number;
        readonly time: number;
      }
    | undefined;
  readonly rank: number;
  readonly bestRank?: number;
}

export interface GameResult {
  readonly score: number;
  readonly time: number;
  readonly rank: number;
  readonly bestTime?: number;
  readonly bestRank?: number;
}

export const getScore: (gameId: string, answers: number[]) => Promise<GameResult> = async (gameId: string, answers: number[]) => {
  const {
    data: { score, bestScore, rank, bestRank },
  } = await axios.post<ResultEntity>(`/games/${gameId}/score`, { answers: answers });
  return {
    score: score.count,
    time: Math.round(score.time / 1000),
    rank: rank,
    ...(bestScore?.time ? { bestTime: Math.round(bestScore.time / 1000) } : {}),
    bestRank,
  };
};
