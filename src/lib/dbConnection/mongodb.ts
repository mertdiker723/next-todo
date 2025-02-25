import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGODB_URI;

if (!MONGO_URL) {
    throw new Error('MONGODB_URI is not defined');
}

const dbConnection = async () => {
    if (mongoose.connection.readyState !== 1) {
        try {
            await mongoose.connect(MONGO_URL);
            console.log('Connected to MongoDB');
        } catch (error) {
            throw new Error(`Error connecting to database: ${error}`);
        }
    } else {
        console.log('Already connected to MongoDB');
    }
}


export default dbConnection;