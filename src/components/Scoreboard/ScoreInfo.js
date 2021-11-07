function ScoreInfo({ currentGame }) {
    const { gameId, wins, looses } = currentGame;

    return (<>
        <h1>Round {gameId}</h1>
        <h2>
            Wins: <span className="color-green">{wins}</span> |
            Looses: <span className="color-red">{looses}</span>
        </h2>
    </>);
}

export default ScoreInfo;