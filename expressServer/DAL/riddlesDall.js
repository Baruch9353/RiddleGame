import { ObjectId } from "mongodb";
import { riddlesCollection } from "../collection/riddleModel.js";

// Get all riddles
export async function getAllRiddles() {
  return (await riddlesCollection()).find().toArray();
};
// Get a riddle by _id
export async function getRiddleById(id) {
    return (await riddlesCollection()).findOne({ _id: new ObjectId(id) });
};
// Add a new riddle
export async function addRiddle(newRiddle) {
  return (await riddlesCollection()).insertOne(newRiddle);
};
// Update a riddle (does not return updated document, only success status)
export async function updateRiddle(id, updatedData) {
    return (await riddlesCollection()).updateOne({ _id: new ObjectId(id) },{$set: {updatedData}});
};
// Delete a riddle
export async function deleteRiddle(id) {
    return (await riddlesCollection()).deleteOne({ _id: new ObjectId(id) });
};
