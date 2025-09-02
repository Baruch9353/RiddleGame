import { useState } from "react";

export default function Play() {
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");

    const riddles = [
        { question: "Example question?", answer: "Example answer" },
    ];

    const submit = () => {
        setFeedback(`Correct answer: ${riddles[0].answer}`);
        setAnswer("");
    };

    return (
        <div>
            <h1>Play Riddle Game</h1>
            <p>{riddles[0].question}</p>
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your answer"
            />
            <button onClick={submit}>Submit</button>

            {feedback && <p>{feedback}</p>}
        </div>
    );
}
