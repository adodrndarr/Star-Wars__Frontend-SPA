import { useEffect, useContext } from 'react';
import If from '../../shared/If';
import GameAudio from '../GameSettings/GameAudio';
import ScoreInfo from './ScoreInfo';
import WinInfo from './WinInfo';
import { AppContext } from '../../App';
import { GameContext } from '../Game/Game';

function Scoreboard() {
    const { games, hasWonOrLost, gameStatus } = useContext(GameContext);
    const { saveGameStats } = useContext(AppContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => saveGameStats(gameStatus), [gameStatus]);

    if (games.length === 0)
        return null;

    const bestTime = getBestTime(games);
    const currentGame = games[games.length - 1];

    const bestGameId = games.find(g => g.time === bestTime).gameId;
    const currentGameIsBest = (currentGame.time > 0) && (bestGameId === currentGame.gameId);

    const winInfo = {
        currentGameIsBest: currentGameIsBest,
        bestGameId: bestGameId,
        bestTime: bestTime
    };

    return <>
        <If rIf={hasWonOrLost}>
            <div className="scoreboard">
                <ScoreInfo currentGame={currentGame} />
                <WinInfo winInfo={winInfo} />
                <GameAudio />
            </div>
        </If>
    </>
};

export default Scoreboard;

function getBestTime(games) {
    const game = [...games].sort((g1, g2) => (g1.time > g2.time) ? -1 : 1);

    return game[0].time;
}
