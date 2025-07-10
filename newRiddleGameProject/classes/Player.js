// Tracks player name and time stats
export class Player {
  constructor(name) {
    this.name = name;
    this.times = [];
  }

  // Records time taken for a riddle
  recordTime(start, end) {
    this.times.push((end - start) / 1000);
  }

  // Shows total and average time
  showStats() {
    const total = this.times.reduce((a, b) => a + b, 0);
    const avg = total / this.times.length;
    console.log(`\nTotal time: ${total.toFixed(2)} seconds`);
    console.log(`Average per riddle: ${avg.toFixed(2)} seconds`);
  }
}
