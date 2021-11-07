import { useState } from 'react';
import party from "party-js";
import getSharedFunctionality from '../shared/getSharedFunctionality';
import { useEffect } from 'react';

function UseStarWars() {
    useEffect(() => {
        setTimeout(() => addGameEffect(), 16000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [gameId, setGameId] = useState(1);
    const [wins, setWins] = useState(0);
    const [looses, setLooses] = useState(0);
    const [games, setGame] = useState([{}]);

    const [canPlayAudio, setCanPlayAudio] = useState(true);
    const [startAudio, setStartAudio] = useState(true);

    const { GAME_STATUS } = getSharedFunctionality();
    const swAudioEl = document.getElementById('star-wars-audio');

    const game = {
        wins: wins,
        looses: looses,
        gameId: gameId,
        time: 0
    };

    const newGame = () => {
        setGameId(gameId + 1);

        const beginStartMusic = (startAudio && swAudioEl.paused);
        if (beginStartMusic) {
            playSWSongRepeatedly(swAudioEl);
            setCanPlayAudio(!canPlayAudio);
        }
    }

    const saveGameStats = (status) => {
        if (status === GAME_STATUS.WON)
            setWins((state) => game.wins = state + 1);
        else if (status === GAME_STATUS.LOST)
            setLooses((state) => game.looses = state + 1);

        setGame([...games, game]);
    }

    const toggleSound = () => {
        setCanPlayAudio(!canPlayAudio);
        if (canPlayAudio) {
            playSWSongRepeatedly(swAudioEl);
            return;
        }

        setStartAudio(false);
        swAudioEl.pause();
    }

    return {
        newGame, saveGameStats, toggleSound,
        gameId, games, canPlayAudio
    };
}

export default UseStarWars;


function playSWSongRepeatedly(audio) {
    audio.play();
    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
    });
}

function addGameEffect() {
    document.body.addEventListener('mouseup', () => {
        party.sparkles(document.body, { count: 14 });
    });
}
