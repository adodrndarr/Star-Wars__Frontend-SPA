import If from '../../shared/If';
import { GameContext } from '../Game/Game';
import { useContext } from 'react';

function GameInfo() {
    const { gameIsActive, motivatingMsg } = useContext(GameContext);

    return (
        <If rIf={gameIsActive}>
            <div className="game-explanation">
                Pick 1 or more numbers that <br /> sum to the number of stars
            </div>
            <h1>{motivatingMsg}</h1>
        </If>
    );
}

export default GameInfo;
