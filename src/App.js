import * as React from 'react';
import { createContext } from 'react';
import Game from './components/Game/Game';
import StarWarsSongUrl from './shared/audio/star-wars-song.mp3';
import UseStarWars from './hooks/UseStarWars';

export const AppContext = createContext();

function App() {
  const {
    newGame, saveGameStats, toggleSound,
    gameId, games, canPlayAudio
  } = UseStarWars();

  const getAppValues = () => {
    return {
      allGames: games,
      currentGameId: gameId,
      soundIsOn: !canPlayAudio,
      toggleSound,
      startNewGame: newGame,
      saveGameStats
    };
  };

  return <>
    <AppContext.Provider value={getAppValues()}>
      <Game key={gameId} />;
    </AppContext.Provider>

    <audio id="star-wars-audio">
      <source src={StarWarsSongUrl} type="audio/mpeg" />
    </audio>
  </>
}

export default App;
