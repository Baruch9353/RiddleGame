import { getAllPlayers, createPlayer, updatePlayer } from '../DAL/playersDal.js';

// Get all players
export async function getAllPlayersController(req, res) {
    const players = await getAllPlayers(); 
    res.json(players); 
}
// Create a new player
// This route isn't essential because users are created as players during signup,
// but it's kept as an optional utility for potential future use.
export async function createPlayerController(req, res) {
    const player = req.body;
    if (!player.id || !player.name || !player.lowestTime) {
      return res.status(400).json({ error: 'Missing required fields: id, name, lowestTime' });
    }
    const newPlayer = await createPlayer(player);
    res.json(newPlayer); 
}
// Update a player by ID
export async function updatePlayerController(req, res) {
    const id = req.params.id;
    const updatedFields = req.body;
    if (!updatedFields.lowestTime) {
      return res.status(400).json({ error: "lowestTime is required" });
    }
    const updatedPlayer = await updatePlayer(id, updatedFields);
    res.json(updatedPlayer);
}

