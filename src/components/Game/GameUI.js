import PlayAgain from '../StarDisplay/PlayAgain';
import StarsDisplay from '../StarDisplay/StarsDisplay';
import If from '../../shared/If';
import { GameContext } from '../Game/Game';
import { useContext } from 'react';

function GameUI() {
    const { hasWonOrLost, gameIsActive } = useContext(GameContext);

    return (
        <div className="g-ui">
            <If rIf={hasWonOrLost}>
                <PlayAgain />
            </If>

            <If rIf={gameIsActive}>
                <StarsDisplay />
            </If>
        </div>
    );
}

export default GameUI;