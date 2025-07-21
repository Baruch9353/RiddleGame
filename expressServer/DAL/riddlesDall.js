import { ObjectId } from "mongodb";
import { riddlesCollection } from "../collection/riddleCollection.js";
// Get all riddles
export async function getAllRiddles() {
  try {
    const collection = await riddlesCollection();
    return await collection.find().toArray();
  } catch (error) {
    console.error("Failed to get all riddles:", error);
    throw error;
  }
}
// Get a riddle by _id
export async function getRiddleById(id) {
  try {
    const collection = await riddlesCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error(`Failed to get riddle with id ${id}:`, error);
    throw error;
  }
}
// Add a new riddle
export async function addRiddle(newRiddle) {
  try {
    const collection = await riddlesCollection();
    return await collection.insertOne(newRiddle);
  } catch (error) {
    console.error("Failed to add riddle:", error);
    throw error;
  }
}
// Update a riddle
export async function updateRiddle(id, updatedData) {
  try {
    const collection = await riddlesCollection();
    return await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
  } catch (error) {
    console.error(`Failed to update riddle with id ${id}:`, error);
    throw error;
  }
}
// Delete a riddle
export async function deleteRiddle(id) {
  try {
    const collection = await riddlesCollection();
    return await collection.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error(`Failed to delete riddle with id ${id}:`, error);
    throw error;
  }
}
