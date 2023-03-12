export interface Duel {
  "_id": string,
  "playerId": string,
  "matchType": number,
  "wins": number,
  "defeats": number,
  "playerWon": boolean,
  "opponent": string
}