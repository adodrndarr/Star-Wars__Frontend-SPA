import If from '../../shared/If';
import getSharedFunctionality from '../../shared/getSharedFunctionality';
import { useContext } from 'react';
import { GameContext } from '../Game/Game';

function Timer() {
    const { hasWonOrLost, secondsLeft, gameIsActive } = useContext(GameContext);
    const { getTimeTxt, getSWtoolTipTxt } = getSharedFunctionality();

    return (
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
    );
}

export default Timer;