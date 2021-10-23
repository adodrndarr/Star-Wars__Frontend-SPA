import * as React from 'react';

const colors = {
    available: 'black',
    used: 'green',
    wrong: 'red',
    candidate: 'deepskyblue',
};

const PlayNumber = props => {
    const changeGameStatus = () => props.onClick(props.number, props.status);

    return <>
        <button
            className="number"
            style={{ backgroundColor: colors[props.status] }}
            onClick={changeGameStatus}
        >
            {props.number}
        </button>
    </>
};

export default PlayNumber;