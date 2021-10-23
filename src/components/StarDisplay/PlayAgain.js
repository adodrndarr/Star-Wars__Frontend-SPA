import * as React from 'react';
import getSharedFunctionality from '../../shared/getSharedFunctionality';


const PlayAgain = props => {
    const { setGameStatus } = getSharedFunctionality();
    const GAME_STATUS = setGameStatus();

    const hasLost = (props.gameStatus === GAME_STATUS.LOST);
    const messageColor = hasLost ? 'red' : 'greenyellow';

    return <>
        <div className="game-done">
            <div
                className="message"
                style={{ color: messageColor }}
            >
                {hasLost ? 'Game Over' : 'Victory!'}
            </div>

            <button className="btn-playAgain" onClick={props.onClick}>Play Again</button>
        </div>
    </>
};

export default PlayAgain;