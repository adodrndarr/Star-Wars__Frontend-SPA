import * as React from 'react';
import utils from '../../utils/math-utils';

const StarsDisplay = props => (
    <div className="stars">
        {utils
            .range(1, props.count)
            .map(starId => (<div key={starId} className="star" />))
        }
    </div>
);

export default StarsDisplay;
