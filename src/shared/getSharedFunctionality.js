import utils from '../utils/math-utils';

const getSharedFunctionality = () => {
    function setGameStatus() {
        return {
            WON: `won`,
            LOST: `lost`,
            ACTIVE: `active`
        }
    };

    function setNumberStatus() {
        return {
            AVAILABLE: `available`,
            CANDIDATE: `candidate`,
            WRONG: `wrong`,
            USED: `used`
        }
    };

    function getTimeTxt(time) {
        if (time > 1)
            return 'Star War secs';
        else if (time === 1)
            return 'Star War sec';
        else
            return 'May the force be with you!';
    };

    function getMotivatingMessage(previousMsg) {
        const motivatingMsgs = ['Nice!', 'Great!', 'Fantastic!', 'Keep it up!', 'Awesome!', 'Hoooooray!', 'Good Choice!', 'Wonderful!'];
        let chosenMsg = '';

        do {
            const randomIndex = utils.random(0, motivatingMsgs.length - 1);
            chosenMsg = motivatingMsgs[randomIndex];
        } while (previousMsg === chosenMsg);

        return chosenMsg;
    }

    function getSWtoolTipTxt() {
        return `Mr. Yoda adds bonus +1 SW sec, if a Correct Guess has been hit!`;
    }

    return { setGameStatus, setNumberStatus, getTimeTxt, getSWtoolTipTxt, getMotivatingMessage };
};

export default getSharedFunctionality;