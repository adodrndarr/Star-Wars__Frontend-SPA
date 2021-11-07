import utils from '../utils/math-utils';

function getSharedFunctionality() {
    const getMotivatingMessage = (previousMsg) => {
        const motivatingMsgs = ['Nice!', 'Great!', 'Fantastic!', 'Keep it up!', 'Awesome!', 'Hoooooray!', 'Good Choice!', 'Wonderful!'];
        let chosenMsg = '';

        do {
            const randomIndex = utils.random(0, motivatingMsgs.length - 1);
            chosenMsg = motivatingMsgs[randomIndex];
        } while (previousMsg === chosenMsg);

        return chosenMsg;
    }

    const getTimeTxt = (time) => {
        if (time > 1)
            return 'Star War secs';
        else if (time === 1)
            return 'Star War sec';
        else
            return 'May the force be with you!';
    };

    const getSWtoolTipTxt = () => `Mr. Yoda adds bonus +1 SW sec, if a Correct Guess has been hit!`;

    const COLORS = {
        available: 'black',
        used: 'green',
        wrong: 'red',
        candidate: 'deepskyblue',
    };

    const GAME_STATUS = {
        WON: `won`,
        LOST: `lost`,
        ACTIVE: `active`
    };

    const NUMBER_STATUS = {
        AVAILABLE: `available`,
        CANDIDATE: `candidate`,
        WRONG: `wrong`,
        USED: `used`
    };

    return { GAME_STATUS, NUMBER_STATUS, COLORS, getTimeTxt, getSWtoolTipTxt, getMotivatingMessage };
};

export default getSharedFunctionality;
