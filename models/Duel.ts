import mongoose, { Model, Schema } from "mongoose";

const duelSchema = new Schema({
  playerId: {
    type: String,
    required: true
  },
  matchType: {
    type: Number,
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
  playerWon: {
    type: Boolean,
    required: true
  },
  opponent: {
    type: String,
    required: true
  },
})

const DuelModel = mongoose.models.Duel || mongoose.model('Duel', duelSchema)

export default DuelModel