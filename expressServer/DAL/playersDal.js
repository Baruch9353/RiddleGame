import { supabaseConnect } from '../DB/supabaseClient.js'

// Get all players from the 'players' table
export async function getAllPlayers() {
  const { data, error } = await supabaseConnect
    .from("players")
    .select("*");
  if (error) throw new Error("Failed to get players: " + error.message);
  return data; 
}

// Create a new player
export async function createPlayer(player) {
  const { data, error } = await supabaseConnect.from("players").insert([player]);
  if (error) throw new Error("Failed to create player: " + error.message);
  return "Player created successfully";
}

// Update a player by id
export async function updatePlayer(id, updatedFields) {
  const { data, error } = await supabaseConnect
    .from("players")
    .update(updatedFields)
    .eq("id", id);
  if (error) throw new Error("Failed to update player: " + error.message);
  return "Player updated successfully";
}


