export interface Player {
  id: number,
  _id: string,
  nickname?: string,
  wins: number,
  defeats: number,
  avatar?: string,
  matchWins: number,
  matchLosses: number,
  matchesPlayed: number,
  winRate?: number
};