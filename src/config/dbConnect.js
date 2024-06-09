import mongoose from "mongoose";

class Mongo
{
	static async connect()
	{
		const MONGODB_URL = process.env.MONGODB_URL;

		if(!MONGODB_URL) throw new Error("MONGODB_URL IS MISSING!!")

		await mongoose.connect(MONGODB_URL,{
			dbName: process.env.DATABASE_NAME,
			bufferCommands: false
		})
		.then(() => console.log("MongoDB is connected"))
		.catch((err) => console.error("Error connectiong to MongoDB", err));
	}
}

export default Mongo
