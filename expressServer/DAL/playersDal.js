import { supabaseConnect } from '../DB/supabaseClient.js';

// Get all players
export async function getAllPlayers() {
  try {
    const { data, error } = await supabaseConnect
      .from("players")
      .select("*");
    if (error) throw new Error("Failed to get players: " + error.message);
    return data;
  } catch (error) {
    console.error("Error in getAllPlayers:", error);
    throw error;
  }
}
// Update a player by id
export async function updatePlayer(id, updatedFields) {
  try {
    const { data, error } = await supabaseConnect
      .from("players")
      .update(updatedFields)
      .eq("id", id);
    if (error) throw new Error("Failed to update player: " + error.message);
    return { message: 'Player updated successfully' };

  } catch (error) {
    console.error("Error in updatePlayer:", error);
    throw error;
  }
}
// Get user by username (for login/signup)
export async function getUserByUsername(username) {
  try {
    const { data, error } = await supabaseConnect
      .from("players")
      .select("*")
      .eq("username", username)
      .single();
    if (error) return null; 
    return data;
  } catch (error) {
    console.error("Error in getUserByUsername:", error);
    throw error;
  }
}
// Create user with username, hashed password and role
export async function createPlayer(username, password_hash, role = "user") {
  try {
    const { data, error } = await supabaseConnect
      .from("players")
      .insert([{ username, password_hash, role }]);
    if (error) throw new Error("Failed to create user: " + error.message);
    return data;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
}
