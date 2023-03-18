import mongoose, { Model, Schema } from "mongoose";
import { DuelStatistic } from '../interfaces';

const duelStatisticsSchema = new Schema({
  playerId: {
    type: String,
    required: true
  },
  eventId: {
    type: String,
    required: true
  },
  wins: {
    type: Number,
    required: true
  },
  defeats: {
    type: Number,
    required: true
  },
  matchWins: {
    type: Number,
  },
  matchLosses: {
    type: Number,
  },
  matchesPlayed: {
    type: Number,
  },
  playerName: {
    type: String
  }
})

const PlayerModel: Model<DuelStatistic> = mongoose.models.DuelStatistics || mongoose.model('DuelStatistics', duelStatisticsSchema)

export default PlayerModel