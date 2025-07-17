import { connectToMongo } from "../DB/mongoClient.js";

export async function riddlesCollection() {
  const db = await connectToMongo();
  return db.collection("riddles");
}