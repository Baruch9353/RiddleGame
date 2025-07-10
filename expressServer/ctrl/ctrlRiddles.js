let riddles =[]

export function getAllRiddles (req, res)
{
  res.json(riddles);
}

export function CreateRiddle (req, res)
{
    const newRiddle = 
    {
        id: riddles[riddles.length - 1].id + 1,
        name: req.body.name,
        taskDescription: req.body.taskDescription,
        correctAnswer: req.body.correctAnswer,
    }
    riddles.push(newRiddle);
    res.json(newRiddle);
}