import { useState, useEffect } from 'react';
import utils from '../utils/math-utils';
import getSharedFunctionality from '../shared/getSharedFunctionality';

function UseGameState() {
    const { GAME_STATUS, NUMBER_STATUS, getMotivatingMessage, getNewNumberOfStars } = getSharedFunctionality();

    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(8);
    const [motivatingMsg, setMotivatingMsg] = useState('');

    useEffect(() => {
        const gameIsInProgress = (secondsLeft > 0) && (availableNums.length > 0);
        if (!gameIsInProgress)
            return null;

        const timeout = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
        return () => clearTimeout(timeout);
    }, [availableNums.length, secondsLeft]);

    const setGameState = (newCandidateNums) => {
        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
            return;
        }

        const newAvailableNums = availableNums.filter(n => !newCandidateNums.includes(n));

        setStars(getNewNumberOfStars(stars, newAvailableNums));
        setAvailableNums(newAvailableNums);
        setCandidateNums([]);

        let chosenMsg = getMotivatingMessage(motivatingMsg);
        setMotivatingMsg(chosenMsg);
    };

    const setTimeForCurrentGame = (games, id) => {
        games.forEach(g => {
            const isCurrentGame = (g.gameId === id);
            if (isCurrentGame)
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

    return {
        stars, availableNums, candidateNums, secondsLeft, motivatingMsg,
        setGameState, setTimeForCurrentGame, getGameStatus, getNumberStatus,
        changeGameState
    };
};

export default UseGameState;
