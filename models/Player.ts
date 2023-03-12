import mongoose, { Model, Schema } from "mongoose";
import { Player } from '../interfaces/Player';

const playerSchema = new Schema({
  nickname: {
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
  avatar: {
    type: String
  }
})

const PlayerModel: Model<Player> = mongoose.models.Player || mongoose.model('Player', playerSchema)

export default PlayerModel