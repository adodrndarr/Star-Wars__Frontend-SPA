import * as React from 'react';
import Scoreboard from '../Scoreboard/Scoreboard';
import UseGameState from '../../hooks/UseGameState';
import getSharedFunctionality from '../../shared/getSharedFunctionality';
import GameUI from './GameUI';
import GameNumbers from './GameNumbers';
import Timer from '../GameSettings/Timer';
import GameInfo from '../GameSettings/GameInfo';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { createContext } from 'react';

export const GameContext = createContext();

function Game() {
    const { currentGameId, allGames } = useContext(AppContext);
    const { GAME_STATUS } = getSharedFunctionality();

    const {
        stars, secondsLeft, motivatingMsg, changeGameState,
        setTimeForCurrentGame, getGameStatus, getNumberStatus
    } = UseGameState();

    const games = allGames.filter(g => g.gameId);
    setTimeForCurrentGame(games, currentGameId);

    const gameStatus = getGameStatus();
    const hasWonOrLost = (gameStatus === GAME_STATUS.WON) || (gameStatus === GAME_STATUS.LOST);
    const gameIsActive = (gameStatus === GAME_STATUS.ACTIVE);

    const getGameValues = () => {
        return {
            gameIsActive,
            motivatingMsg,
            hasWonOrLost,
            gameStatus,
            stars,
            secondsLeft,
            games,
            getNumberStatus,
            changeGameState
        };
    };

    return (
        <GameContext.Provider value={getGameValues()}>
            <div className="game">
                <GameInfo />

                <div className="game-main-content">
                    <GameUI />
                    <GameNumbers />
                </div>

                <Timer />
                <Scoreboard />
            </div >
        </GameContext.Provider>
    );
};

export default Game;
