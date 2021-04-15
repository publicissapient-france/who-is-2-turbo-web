import axios, { AxiosResponse } from 'axios';

export interface Answer {
  firstName: string
  lastName: string
}

export interface TQuestion {
  question: string
  propositions: Answer[]
}

export interface Game {
  id: string
  questions: TQuestion[]
}

export const getGame: () => Promise<AxiosResponse<Game>> = async () => {
  return await axios.post<Game>(process.env.GATSBY_API_URL + '/games');
};
