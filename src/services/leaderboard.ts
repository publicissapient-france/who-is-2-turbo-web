import { isBrowser } from './common';

const LEADERBOARD_PAGE_KEY = `leaderboardPage`;

export interface LeaderboardUser {
  firstName: string
  lastName: string
  score: number
}

export const saveLeaderboardPage = (users: LeaderboardUser[]) => isBrowser() && window.localStorage.setItem(LEADERBOARD_PAGE_KEY, JSON.stringify(users));
export const getLeaderboardPage = () => isBrowser() && JSON.parse(window.localStorage.getItem(LEADERBOARD_PAGE_KEY) || '[]');
