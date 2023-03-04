import {gameConfig, handleBothClick, handleLeftClick, handleRightClick} from './gameHelpers';
import { RootState } from './store';
import {MouseClickEvent, MouseKey} from "../models/mouse";
import {SmileyButton} from "../models/smile";
import {createReducer, PayloadAction} from "typesafe-actions";
import {initBoard} from "../models/cell";
import {GAME_ACTION_TYPES} from "./action-types";

const getInitialState = () => ({
    minesCounter: gameConfig.mines,
    timeCounter: 0,
    smileyButton: SmileyButton.faceSmile,
    board: initBoard(gameConfig.width, gameConfig.height),
    mineField: undefined,
    mouseLeft: undefined,
    mouseMiddle: undefined,
    mouseRight: undefined,
    clockRunning: false,
    gameStarted: false,
    gameEnded: false,
});

const GameReducer = createReducer<RootState>(getInitialState())

    .handleType(GAME_ACTION_TYPES.SET_MINES_COUNTER, (state: RootState, action: PayloadAction<string, number>) => ({
        ...state,
        minesCounter: action.payload,
    }))
    .handleType(GAME_ACTION_TYPES.SET_TIME_COUNTER, (state: RootState, action: PayloadAction<string, number>) => ({
        ...state,
        timeCounter: action.payload,
    }))
    .handleType(GAME_ACTION_TYPES.SET_SMILEY_BUTTON, (state: RootState, action: PayloadAction<string, SmileyButton>) => ({
        ...state,
        smileyButton: action.payload,
    }))
    .handleType(GAME_ACTION_TYPES.ON_MOUSE_DOWN, (state: RootState, action: PayloadAction<string, MouseClickEvent>) => {
        if (state.gameEnded) return state;
        if (action.payload.key === MouseKey.LEFT) {
            return ({
                ...state,
                mouseLeft: action.payload.target,
                smileyButton: SmileyButton.faceCellPressed,
            });
        }
        if (action.payload.key === MouseKey.MIDDLE) {
            return ({
                ...state,
                mouseMiddle: action.payload.target,
                smileyButton: SmileyButton.faceCellPressed,
            });
        }
        if (action.payload.key === MouseKey.RIGHT) {
            return ({
                ...state,
                mouseRight: action.payload.target,
                smileyButton: SmileyButton.facePressed,
            });
        }
        return state;
    })
    .handleType(GAME_ACTION_TYPES.ON_MOUSE_UP, (state: RootState, action: PayloadAction<string, MouseClickEvent>) => {
        if (state.gameEnded) return state;
        if (action.payload.key === MouseKey.LEFT) {
            return ({
                ...state,
                mouseLeft: undefined,
                smileyButton: state.mouseRight ? SmileyButton.faceCellPressed : SmileyButton.faceSmile,
            });
        }
        if (action.payload.key === MouseKey.MIDDLE) {
            return ({
                ...state,
                mouseMiddle: undefined,
                smileyButton: (state.mouseRight || state.mouseLeft) ? SmileyButton.faceCellPressed : SmileyButton.faceSmile,
            });
        }
        if (action.payload.key === MouseKey.RIGHT) {
            return ({
                ...state,
                mouseRight: undefined,
                smileyButton: state.mouseLeft ? SmileyButton.faceCellPressed : SmileyButton.faceSmile,
            });
        }
        return state;
    })
    .handleType(GAME_ACTION_TYPES.ON_MOUSE_ENTER, (state: RootState, action: PayloadAction<string, MouseClickEvent>) => {
        if (state.mouseLeft !== undefined && state.mouseRight !== undefined) {
            return ({
                ...state,
                mouseLeft: action.payload.target,
                mouseRight: action.payload.target,
            });
        }
        if (state.mouseLeft !== undefined) {
            return ({
                ...state,
                mouseLeft: action.payload.target,
            });
        }
        if (state.mouseMiddle !== undefined) {
            return ({
                ...state,
                mouseMiddle: action.payload.target,
            });
        }
        if (state.mouseRight !== undefined) {
            return ({
                ...state,
                mouseRight: action.payload.target,
            });
        }
        return state;
    })
    .handleType(GAME_ACTION_TYPES.CELL_LEFT_CLICK, handleLeftClick)
    .handleType(GAME_ACTION_TYPES.CELL_RIGHT_CLICK, handleRightClick)
    .handleType(GAME_ACTION_TYPES.CELL_BOTH_CLICK, handleBothClick)
    .handleType(GAME_ACTION_TYPES.SMILEY_CLICK, () => (
        getInitialState()
    ))
    .handleType(GAME_ACTION_TYPES.CLOCK_TICK, (state: RootState) => ({
        ...state,
        timeCounter: state.timeCounter + 1,
    }));


export default GameReducer;