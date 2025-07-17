import { ObjectId } from "mongodb";
import { riddlesCollection } from "../models/riddleModel.js";

// Get all riddles
export async function getAllRiddles() {
  const collection = await riddlesCollection();
  return await collection.find().toArray();
}

// Get a riddle by _id
export async function getRiddleById(id) {
  try {
    const collection = await riddlesCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  } catch {
    return null;
  }
}

// Add a new riddle
export async function addRiddle(newRiddle) {
  const collection = await riddlesCollection();
  return await collection.insertOne(newRiddle);
}

// Update a riddle (does not return updated document, only success status)
export async function updateRiddle(id, updatedData) {
  try {
    const collection = await riddlesCollection();
    return await collection.updateOne({ _id: new ObjectId(id) },{$set: {updatedData}});
  } catch {
    return false;
  }
}
// Delete a riddle
export async function deleteRiddle(id) {
  try {
    const collection = await riddlesCollection();
    return await collection.deleteOne({ _id: new ObjectId(id) });
  } catch {
    return false;
  }
}
