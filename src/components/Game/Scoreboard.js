import { useEffect } from 'react';
import If from '../../shared/If';
import getSharedFunctionality from '../../shared/getSharedFunctionality';

const Scoreboard = (props) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => props.saveStats(props.status), []);

    const { setGameStatus, getTimeTxt, getSWtoolTipTxt } = getSharedFunctionality();
    const GAME_STATUS = setGameStatus();

    const games = props.games;
    if (games.length === 0)
        return null;

    const bestTime = [...games].sort((g1, g2) => (g1.time > g2.time) ? -1 : 1)[0].time;
    const currentGame = games[games.length - 1];

    const bestGameId = games.find(g => g.time === bestTime).gameId;
    const currentGameIsBest = (currentGame.time > 0) && (bestGameId === currentGame.gameId);

    return <div className="scoreboard">
        <h1>Round {currentGame.gameId}</h1>
        <h2>
            Wins: <span className="color-green">{currentGame.wins}</span> |
            Looses: <span className="color-red">{currentGame.looses}</span>
        </h2>

        <If rIf={props.status === GAME_STATUS.WON}>
            <hr />
            <If rIf={currentGameIsBest}>
                <h1>New high score, your best game!!</h1>
            </If>

            <If rIf={!currentGameIsBest}>
                <h1><span className="color-green">Best game:</span></h1>
                <h1 title={getSWtoolTipTxt()}>Round {bestGameId} with {bestTime} {getTimeTxt(bestTime)} score.</h1>
            </If>
        </If>

        <div>
            <button onClick={props.toggleSound}>Sound:
                <span style={{
                    color: props.soundIsOn ? 'greenyellow' : 'red'
                }}>
                    {props.soundIsOn ? 'ON' : 'OFF'}
                </span>
            </button>
        </div>
    </div>
};

export default Scoreboard;
