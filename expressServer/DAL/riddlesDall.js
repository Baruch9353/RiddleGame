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

  const riddleToAdd = {
    name: newRiddle.name,
    taskDescription: newRiddle.taskDescription,
    correctAnswer: newRiddle.correctAnswer
  };

  const result = await collection.insertOne(riddleToAdd);
  return { _id: result.insertedId, ...riddleToAdd };
}

// Update a riddle (does not return updated document, only success status)
export async function updateRiddle(id, updatedData) {
  try {
    const collection = await riddlesCollection();

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: updatedData.name,
          taskDescription: updatedData.taskDescription,
          correctAnswer: updatedData.correctAnswer
        }
      }
    );

    return result.modifiedCount === 1; // if update tru, else false
  } catch {
    return false;
  }
}

// Delete a riddle
export async function deleteRiddle(id) {
  try {
    const collection = await riddlesCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  } catch {
    return false;
  }
}
