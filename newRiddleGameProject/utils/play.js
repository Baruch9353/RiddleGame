// import fs from 'fs';
import { Riddle } from '../classes/Riddle.js';
import { getAllPlayers, createPlayer, updatePlayer } from '../players/playersApi.js'
import { Player } from '../classes/Player.js';


export async function playGame(name) {
  const res = await fetch('http://localhost:3000/riddles');
  if (!res.ok) throw new Error(`Failed to fetch riddles: ${res.status}`);
  const riddles = await res.json();

  const player = new Player(name);

  for (const data of riddles) {
    const riddle = new Riddle(data);
    console.log(`\nRiddle ${riddle.id}: ${riddle.name}`);
    const start = Date.now();
    await riddle.ask();
    const end = Date.now();
    player.recordTime(start, end);
  }

  player.showStats();
  updatePlayerScore(name, player.times.reduce((a, b) => a + b, 0));
}

async function updatePlayerScore(name, time) {
  const players = await getAllPlayers();
  const player = players.find(p => p.name === name);

  if (!player) {
    const p = { id: players.length + 1, name, lowestTime: time };
    await createPlayer(p);
  } else if (time < player.lowestTime) {
    await updatePlayer(player.id, { lowestTime: time });
  }
};
