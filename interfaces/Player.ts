export interface Player {
  id: number,
  nickname?: string,
  wins: number,
  defeats: number,
  avatar?: string,
  matchWins: number,
  matchLosses: number,
  matchesPlayed: number,
  winRate?: number
};