import mongoose from 'mongoose';

let isConnected = false 

export const connectToDB = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected.')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || ' ', {
            dbName:"cafeteria-app",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any)
        isConnected = true
        console.log('MongoDB connected.')
    }
    catch (error) {
        console.log(error)
    }

    isConnected = mongoose.connections[0].readyState === 1;
}