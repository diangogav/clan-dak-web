export interface DuelStatistic {
  _id: string,
  playerId: string,
  eventId: string,
  wins: number,
  defeats: number,
  matchWins: number,
  matchLosses: number,
  matchesPlayed: number,
  playerName: string
}