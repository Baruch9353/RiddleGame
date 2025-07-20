import { getAllPlayers, createPlayer, updatePlayer } from '../DAL/playersDal.js';

// Get all players
export async function getAllPlayersController(req, res) {
    const players = await getAllPlayers(); 
    res.json(players); 
}

// Create a new player
export async function createPlayerController(req, res) {
    const player = req.body;
    if (!player.id || !player.name || player.lowestTime === undefined) {
      return res.status(400).json({ error: 'Missing required fields: id, name, lowestTime' });
    }
    const newPlayer = await createPlayer(player);
    res.json(newPlayer); 
}

// Update a player by ID
export async function updatePlayerController(req, res) {
    const id = req.params.id;
    const updatedFields = req.body;
    if (updatedFields.lowestTime === undefined) {
      return res.status(400).json({ error: "lowestTime is required" });
    }
    const updatedPlayer = await updatePlayer(id, updatedFields);
    res.json(updatedPlayer);
}

