import * as React from 'react';
import StarsDisplay from '../StarDisplay/StarsDisplay';
import utils from '../../utils/math-utils';
import PlayNumber from '../StarDisplay/PlayNumber';
import PlayAgain from '../StarDisplay/PlayAgain';
import Scoreboard from './Scoreboard';
import useGameState from './UseGameState';
import If from '../../shared/If';
import getSharedFunctionality from '../../shared/getSharedFunctionality';

const Game = props => {
    const { stars, availableNums, candidateNums, secondsLeft, motivatingMsg, setGameState } = useGameState();
    const { setGameStatus, setNumberStatus, getTimeTxt, getSWtoolTipTxt } = getSharedFunctionality();

    const games = props.games.filter(g => g.gameId);
    const GAME_STATUS = setGameStatus();
    const NUMBER_STATUS = setNumberStatus();

    const setTimeForCurrentGame = () => {
        games.forEach(g => {
            const isCurrentGame = (g.gameId === props.currentGameId);
            if (!isCurrentGame)
                return;

            g.time = secondsLeft;
        });
    };

    const getGameStatus = () => {
        const status = (availableNums.length === 0) && (secondsLeft > 0)
            ? GAME_STATUS.WON
            : (secondsLeft === 0)
                ? GAME_STATUS.LOST : GAME_STATUS.ACTIVE;

        return status;
    }

    const getNumberStatus = number => {
        if (!availableNums.includes(number))
            return NUMBER_STATUS.USED;

        if (candidateNums.includes(number)) {
            const candidatesAreWrong = utils.sum(candidateNums) > stars;
            return candidatesAreWrong ? NUMBER_STATUS.WRONG : NUMBER_STATUS.CANDIDATE;
        }

        return NUMBER_STATUS.AVAILABLE;
    };

    const changeGameState = (number, currentStatus) => {
        if (currentStatus === NUMBER_STATUS.USED || secondsLeft === 0) {
            return;
        }

        const newCandidateNums = (currentStatus === NUMBER_STATUS.AVAILABLE)
            ? candidateNums.concat(number)
            : candidateNums.filter(cn => cn !== number);

        setGameState(newCandidateNums);
    };


    setTimeForCurrentGame();
    const gameStatus = getGameStatus();
    const hasWonOrLost = (gameStatus === GAME_STATUS.WON) || (gameStatus === GAME_STATUS.LOST);
    const gameIsActive = (gameStatus === GAME_STATUS.ACTIVE);

    return (
        <div className="game">
            <If rIf={gameIsActive}>
                <div className="game-explanation">
                    Pick 1 or more numbers that <br /> sum to the number of stars
                </div>
                <h1>{motivatingMsg}</h1>
            </If>

            <div className="game-main-content">
                <div className="g-ui">
                    <If rIf={hasWonOrLost}>
                        <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
                    </If>

                    <If rIf={gameIsActive}>
                        <StarsDisplay count={stars} />
                    </If>
                </div>

                <div className="g-numbers">
                    {utils
                        .range(1, 9)
                        .map(number => (
                            <PlayNumber
                                key={number}
                                number={number}
                                status={getNumberStatus(number)}
                                onClick={changeGameState}
                            />
                        ))
                    }
                </div>
            </div>

            <div className="timer" title={getSWtoolTipTxt()}>
                <div>Time Left:</div>

                <If rIf={hasWonOrLost}>
                    <div>{secondsLeft}</div>
                </If>
                <If rIf={gameIsActive}>
                    <div className="timer-secs">{secondsLeft}</div>
                </If>

                <div>{getTimeTxt(secondsLeft)}</div>
            </div>

            <If rIf={hasWonOrLost}>
                <Scoreboard
                    saveStats={props.saveStats}
                    status={gameStatus}
                    games={games}
                    soundIsOn={props.soundIsOn}
                    toggleSound={props.toggleSound}
                />
            </If>
        </div >
    );
};

export default Game;
