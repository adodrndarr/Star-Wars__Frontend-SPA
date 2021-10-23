import * as React from 'react';
import { useState, useEffect } from 'react';
import Game from './components/Game/Game';
import getSharedFunctionality from './shared/getSharedFunctionality';
import StarWarsSongUrl from './shared/audio/star-wars-song.mp3';
import party from "party-js";

const StarWars = () => {
  const [gameId, setGameId] = useState(1);
  const [wins, setWins] = useState(0);
  const [looses, setLooses] = useState(0);
  const [games, setGame] = useState([{}]);

  const [canPlayAudio, setCanPlayAudio] = useState(true);
  const [startAudio, setStartAudio] = useState(true);

  const { setGameStatus } = getSharedFunctionality();
  const GAME_STATUS = setGameStatus();
  const swAudioEl = document.getElementById('star-wars-audio');

  useEffect(() => {
    setTimeout(() => addGameEffect(), 16000);
  }, []);

  let game = {
    wins: wins,
    looses: looses,
    gameId: gameId,
    time: 0
  };

  const newGame = () => {
    setGameId(gameId + 1);

    const beginStartMusic = (startAudio && swAudioEl.paused);
    if (beginStartMusic) {
      playSWSongRepeatedly();
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
      playSWSongRepeatedly();
      return;
    }

    setStartAudio(false);
    swAudioEl.pause();
  }

  const playSWSongRepeatedly = () => {
    swAudioEl.play();
    swAudioEl.addEventListener('ended', () => {
      swAudioEl.currentTime = 0;
      swAudioEl.play();
    });
  }

  const addGameEffect = () => {
    document.body.addEventListener('mouseup', () => {
      party.sparkles(document.body, { count: 14 });
    });
  }

  return <>
    <Game
      key={gameId}
      currentGameId={gameId}
      startNewGame={newGame}
      saveStats={saveGameStats}
      games={games}
      soundIsOn={!canPlayAudio}
      toggleSound={toggleSound}
    />;

    <audio id="star-wars-audio">
      <source src={StarWarsSongUrl} type="audio/mpeg" />
    </audio>
  </>
}

export default StarWars;