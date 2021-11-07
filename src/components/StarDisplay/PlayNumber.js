import * as React from 'react';
import getSharedFunctionality from '../../shared/getSharedFunctionality';
import { useContext } from 'react';
import { GameContext } from '../Game/Game';

function PlayNumber({ number }) {
    const { getNumberStatus, changeGameState } = useContext(GameContext);
    const status = getNumberStatus(number);

    const changeGameStatus = () => changeGameState(number, status);
    const { COLORS } = getSharedFunctionality();

    return <>
        <button
            className="number"
            style={{ backgroundColor: COLORS[status] }}
            onClick={changeGameStatus}
        >
            {number}
        </button>
    </>
};

export default PlayNumber;