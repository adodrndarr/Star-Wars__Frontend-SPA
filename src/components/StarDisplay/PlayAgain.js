import * as React from 'react';
import getSharedFunctionality from '../../shared/getSharedFunctionality';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { GameContext } from '../Game/Game';

function PlayAgain() {
    const { gameStatus } = useContext(GameContext);
    const { startNewGame } = useContext(AppContext);
    const { GAME_STATUS } = getSharedFunctionality();

    const hasLost = (gameStatus === GAME_STATUS.LOST);
    const messageColor = hasLost ? 'red' : 'greenyellow';

    return <>
        <div className="game-done">
            <div
                className="message"
                style={{ color: messageColor }}
            >
                {hasLost ? 'Game Over' : 'Victory!'}
            </div>

            <button className="btn-playAgain" onClick={startNewGame}>Play Again</button>
        </div>
    </>
};

export default PlayAgain;
