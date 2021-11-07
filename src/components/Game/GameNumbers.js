import utils from '../../utils/math-utils';
import PlayNumber from '../StarDisplay/PlayNumber';

function GameNumbers() {
    return (
        <div className="g-numbers">
            {utils
                .range(1, 9)
                .map(number => <PlayNumber key={number} number={number} />)
            }
        </div>
    );
}

export default GameNumbers;