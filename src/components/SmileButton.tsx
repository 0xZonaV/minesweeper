import {gameConfig} from "../state/gameHelpers";
import {onSmileyClick, setSmileyButton} from "../state/actions";
import {getSmileyButton} from "../state/selector";
import {useDispatch, useSelector} from "react-redux";
import {SmileyButton} from "../models/smile";
const _ = require("lodash");

const getStyles = () => {
    const margin = (gameConfig.width * 16 - 90 - 26) / 2;
    return {
        "marginLeft": `${margin}px`,
        "marginRight": `${margin}px`,
        "marginTop": "3px",
        "marginBottom": "3px"
    };
}

const Smile = () => {
    const smiley = useSelector(getSmileyButton);
    const dispatch = useDispatch();
    return (
        <div style={{'backgroundImage':'none'}}>
            <div id="smiley"
                 className={smiley} style={getStyles()}
                 onMouseDown={() => {
                     dispatch(setSmileyButton(SmileyButton.facePressed));
                 }}
                 onMouseUp={() => {
                     if (smiley === SmileyButton.facePressed){
                         dispatch(onSmileyClick());
                         dispatch(setSmileyButton(SmileyButton.faceSmile));
                     }
                 }}
                 onMouseOut={() => {
                     const ignoreStates = [SmileyButton.faceWin, SmileyButton.faceLoose, SmileyButton.faceSmile];
                     if (!_.includes(ignoreStates, smiley)) {
                         dispatch(setSmileyButton(SmileyButton.faceSmile));
                     }
                 }}
            />
        </div>
    );
}
export default Smile;