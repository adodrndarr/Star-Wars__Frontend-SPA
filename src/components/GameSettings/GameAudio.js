import { useContext } from 'react';
import { AppContext } from '../../App';

function GameAudio() {
    const { soundIsOn, toggleSound } = useContext(AppContext);

    return (
        <div>
            <button onClick={toggleSound}>Sound:
                <span style={{
                    color: soundIsOn ? 'greenyellow' : 'red'
                }}>
                    {soundIsOn ? 'ON' : 'OFF'}
                </span>
            </button>
        </div>
    );
}

export default GameAudio;
