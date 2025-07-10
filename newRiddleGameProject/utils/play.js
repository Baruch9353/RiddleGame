// Runs the riddle game
import fs from 'fs';
import { Riddle } from '../classes/Riddle.js';
import { Player } from '../classes/Player.js';

export function playGame(name) {
  const riddles = JSON.parse(fs.readFileSync('./riddles/db.txt'));
  const player = new Player(name);

  for (const data of riddles) {
    const riddle = new Riddle(data);
    console.log(`\nRiddle ${riddle.id}: ${riddle.name}`);
    const start = Date.now();
    riddle.ask();
    const end = Date.now();
    player.recordTime(start, end);
  }

  player.showStats();
  updatePlayerScore(name, player.times.reduce((a, b) => a + b, 0));
}

function updatePlayerScore(name, time) {
  const path = './players/players.txt';
  const players = JSON.parse(fs.readFileSync(path));
  const player = players.find(p => p.name === name);

  if (!player) {
    players.push({ id: players.length + 1, name, lowestTime: time });
    console.log('New player added.');
  } else if (time < player.lowestTime) {
    player.lowestTime = time;
    console.log('New record! Time updated.');
  }

  fs.writeFileSync(path, JSON.stringify(players, null, 2));
}
