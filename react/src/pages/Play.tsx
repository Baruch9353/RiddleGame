import { useState, useEffect, useRef } from "react";

type Riddle = {
    _id: string;
    name: string;
    taskDescription: string;
    correctAnswer: string;
};

export default function Play() {
    const [riddles, setRiddles] = useState<Riddle[]>([]);
    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState("");
    const [times, setTimes] = useState<number[]>([]);
    const [completed, setCompleted] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [timer, setTimer] = useState(0);

    const startTime = useRef<number>(0);
    useEffect(() => {
        fetch("http://localhost:3000/riddles")
            .then(res => res.json())
            .then(data => setRiddles(data))
            .catch(err => console.error("Failed to load riddles:", err));
    }, []);

    useEffect(() => {
        if (!riddles.length || completed || current >= riddles.length) return;

        startTime.current = Date.now();
        setTimer(0);
        setFeedback("");

        const interval = setInterval(() => {
            setTimer(Math.floor((Date.now() - startTime.current) / 1000));
        }, 500);

        return () => clearInterval(interval);
    }, [current, riddles, completed]);

    const submit = () => {
        const riddle = riddles[current];
        if (answer.trim().toLowerCase() === riddle.correctAnswer.toLowerCase()) {
            const elapsed = (Date.now() - startTime.current) / 1000;
            const newTimes = [...times, elapsed];
            setTimes(newTimes);
            setAnswer("");

            if (current + 1 < riddles.length) {
                setCurrent(current + 1);
            } else {
                setCompleted(true);
                // כאן אקרא ל-LowestTime
            }
        } else {
            setFeedback("Incorrect answer, try again!");
        }
    };

    if (!riddles.length) return <p>Loading riddles...</p>;

    if (completed) {
        const avg = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2);
        return (
            <div>
                <h2>All riddles completed!</h2>
                <p>Average time: {avg}s</p>
            </div>
        );
    }

    return (
        <div>
            <p>Time: {timer}s</p>
            <h2>{riddles[current].taskDescription}</h2>
            <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your answer"
            />
            <button onClick={submit}>Check Answer</button>
            {feedback && <p>{feedback}</p>}
        </div>
    );
}
