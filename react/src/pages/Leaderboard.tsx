export default function Leaderboard() {
    const mock = [
        { username: "aa", time: 20 },
        { username: "bb", time: 30 },
        { username: "cc", time: 40 },
    ];

    return (
        <section>
            <h2>Leaderboard</h2>
            <ul>
                {mock.map((p, i) => (
                    <li key={i}>
                        {p.username} - {p.time} seconds
                    </li>
                ))}
            </ul>
        </section>
    );
}
