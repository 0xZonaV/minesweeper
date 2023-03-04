import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {getMinesCounter, getTimeCounter, isClockRunning} from "../state/selector";
import {clockTick} from "../state/actions";
import {gameConfig} from "../state/gameHelpers";
import DigitCounter from "./DigitCounter";
import Smile from "./SmileButton";
const _ = require('lodash');

const Header = () => {
    const dispatch = useDispatch();
    const {width} = gameConfig;
    const minesCounter = useSelector(getMinesCounter);
    const timeCounter = useSelector(getTimeCounter);
    const clockRunning = useSelector(isClockRunning);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (clockRunning) {
            intervalRef.current = setInterval(() => { dispatch(clockTick()); }, 1000);
        } else  if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [clockRunning, dispatch])
    // @ts-ignore
    const line = _.range(width).map(key => <div key={key} className="bordertb" />);
    return (
        <div className="msw-header">
            <div className="bordertl" />
            {line}
            <div className="bordertr" />

            <div className="borderlrlong"/>
                <DigitCounter value={minesCounter} id="mines" />
                <Smile />
                <DigitCounter value={timeCounter} id="seconds"/>
            <div className="borderlrlong"/>

            <div className="borderjointl" />
            {line}
            <div className="borderjointr" />
        </div>
    );
}
export default Header;