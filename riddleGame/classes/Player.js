// Represents a player, with optional times, role, and lowest time
export class Player {
  constructor(id, name, times = [], role = 'user', lowestTime = null) {
    this.id = id;
    this.name = name;
    this.times = times;
    this.role = role;
    this.lowestTime = lowestTime;
  }

  // Records the time it took to solve a riddle
  recordTime(start, end) {
    this.times.push((end - start) / 1000);
  }

  // Prints total and average time
  showStats() {
    const total = this.times.reduce((a, b) => a + b, 0);
    const avg = total / this.times.length;
    console.log(`\nTotal time: ${total.toFixed(2)} seconds`);
    console.log(`Average per riddle: ${avg.toFixed(2)} seconds`);
    return avg;
  }
}
