import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Cell } from "../models/cell";
import { Field } from "../models/field";
import { SmileyButton } from "../models/smile";
import reducer from './reducer';


export type RootState = {
    minesCounter: number,
    timeCounter: number,
    smileyButton: SmileyButton,
    board: Cell[],
    mineField: Field[] | undefined,
    mouseLeft: string | undefined,
    mouseMiddle: string | undefined,
    mouseRight: string | undefined,
    clockRunning: boolean,
    gameStarted: boolean,
    gameEnded: boolean,
};

export default createStore(reducer, applyMiddleware(thunk));