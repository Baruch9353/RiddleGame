import { connectToMongo } from "../DB/mongoClient.js";

// Connects to the DB and returns the 'riddles' collection
export async function riddlesCollection() {
  const db = await connectToMongo();
  return db.collection("riddles");
}