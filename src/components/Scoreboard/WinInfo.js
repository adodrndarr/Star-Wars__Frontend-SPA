import If from '../../shared/If';
import getSharedFunctionality from '../../shared/getSharedFunctionality';
import { useContext } from 'react';
import { GameContext } from '../Game/Game';

function WinInfo({ winInfo }) {
    const { currentGameIsBest, bestGameId, bestTime } = winInfo;
    const { gameStatus } = useContext(GameContext);
    const { GAME_STATUS, getTimeTxt, getSWtoolTipTxt } = getSharedFunctionality();

    return (
        <If rIf={gameStatus === GAME_STATUS.WON}>
            <hr />
            <If rIf={currentGameIsBest}>
                <h1>New high score, your best game!!</h1>
            </If>

            <If rIf={!currentGameIsBest}>
                <h1><span className="color-green">Best game:</span></h1>
                <h1 title={getSWtoolTipTxt()}>Round {bestGameId} with {bestTime} {getTimeTxt(bestTime)} score.</h1>
            </If>
        </If>
    );
}

export default WinInfo;
