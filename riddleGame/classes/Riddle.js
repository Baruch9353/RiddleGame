// Represents a single riddle
import readline from 'readline-sync';

export class Riddle {
  constructor({ _id, name, taskDescription, correctAnswer }) {
    this.id = _id;
    this.name = name;
    this.taskDescription = taskDescription;
    this.correctAnswer = correctAnswer;
  }

  // Asks the riddle until the correct answer is given
  ask() {
    console.log('\nLet the Riddle Game begin!\n');
    let answer;
    do {
      console.log(`Riddle ID: ${this.id}`);
      console.log(`Name: ${this.name}`);
      console.log(`Question: ${this.taskDescription}`);
      
      answer = readline.question('Your answer: ').trim();
      if (answer.toLowerCase() !== this.correctAnswer.toLowerCase()) {
        console.log('Wrong answer, try again.');
      }
    } while (answer.toLowerCase() !== this.correctAnswer.toLowerCase());
    console.log('Correct!\n');
  }
}
