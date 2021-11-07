import * as React from 'react';
import utils from '../../utils/math-utils';
import { useContext } from 'react';
import { GameContext } from '../Game/Game';

function StarsDisplay() {
    const { stars } = useContext(GameContext);

    return (
        <div className="stars">
            {utils
                .range(1, stars)
                .map(starId => <div key={starId} className="star" />)
            }
        </div>
    );
}

export default StarsDisplay;
