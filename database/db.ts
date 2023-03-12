import mongoose from 'mongoose'

/**
    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
 */
const mongoConnection = {
  isConnected: 0
}

export const connect = async () => {
  if(mongoConnection.isConnected) {
    return
  }

  if(mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState

    if(mongoConnection.isConnected === 1) {
      return
    }
  }

  await mongoose.connect(process.env.MONGO_URL!) //TODO: Mover a un archivo config
  mongoConnection.isConnected = 1
  console.log('Conectado a la db')
}