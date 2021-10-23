import { useState, useEffect } from 'react';
import utils from '../../utils/math-utils';
import getSharedFunctionality from '../../shared/getSharedFunctionality';

const useGameState = () => {
    const { getMotivatingMessage } = getSharedFunctionality();

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
        setStars(utils.randomSumIn(newAvailableNums, 9));
        setAvailableNums(newAvailableNums);
        setCandidateNums([]);

        let chosenMsg = getMotivatingMessage(motivatingMsg);
        setMotivatingMsg(chosenMsg);
    };

    return { stars, availableNums, candidateNums, secondsLeft, motivatingMsg, setGameState };
};

export default useGameState;


