import { useState, useEffect } from "react";

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
    const [startTime, setStartTime] = useState<number>(0);
    const [completed, setCompleted] = useState(false);
    const [timer, setTimer] = useState(0);
    const [feedback, setFeedback] = useState("");

    // Load riddles from server
    useEffect(() => {
        fetch("http://localhost:3000/riddles")
            .then(res => res.json())
            .then(data => setRiddles(data))
            .catch(err => console.error("Failed to load riddles:", err));
    }, []);

    // Start timer for current riddle
    useEffect(() => {
        if (riddles.length === 0 || completed || current >= riddles.length) return;
        setStartTime(Date.now());
        setTimer(0);
        setFeedback("");
    }, [current, riddles, completed]);

    // Timer interval
    useEffect(() => {
        if (completed || riddles.length === 0) return;
        const interval = setInterval(() => {
            setTimer(Math.floor((Date.now() - startTime) / 1000));
        }, 500);
        return () => clearInterval(interval);
    }, [startTime, completed, riddles]);

    const submit = () => {
        if (answer.trim().toLowerCase() === riddles[current].correctAnswer.toLowerCase()) {
            const elapsed = (Date.now() - startTime) / 1000;
            const newTimes = [...times, elapsed];
            setTimes(newTimes);
            setAnswer("");

            if (current + 1 < riddles.length) {
                setCurrent(current + 1);
            } else {
                setCompleted(true);
                sendLowestTime(newTimes);
            }
        } else {
            setFeedback("Incorrect answer, try again!");
        }
    };

    const sendLowestTime = (allTimes: number[]) => {
        const token = localStorage.getItem("token");
        if (!token) return; 

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const playerId = payload.id; 
            const totalTime = allTimes.reduce((a, b) => a + b, 0);

            fetch(`http://localhost:3000/players/${playerId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ lowestTime: totalTime })
            })
                .then(res => res.json())
                .then(data => console.log("Lowest time updated:", data))
                .catch(err => console.error(err));
        } catch (err) {
            console.error("Invalid token:", err);
        }
    };

    if (riddles.length === 0) return <p>Loading riddles...</p>;

    if (completed) {
        const avg = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2);
        return (
            <div>
                <h2>All riddles completed!</h2>
                <p>Average time per riddle: {avg} seconds</p>
                {!localStorage.getItem("token") && <p>You played as a guest. Sign up or log in to save your score!</p>}
            </div>
        );
    }

    return (
        <div>
            <p>Time: {timer}s</p>
            <h2>{riddles[current].taskDescription}</h2>
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
