import {
    Cell,
    isBombFlag,
    isEmpty, isQuestion,
    isWin,
    revealBoardOnClick,
    revealBoardOnDeath
} from "../models/cell";
import {Coordinate, getIndexFromCoordinates} from "../models/coordinates";
import {SmileyButton} from "../models/smile";
import {initMineField, isBomb} from "../models/field";
import {PayloadAction} from "typesafe-actions";
import {RootState} from "./store";


export const gameConfig = {
    width: 16,
    height: 16,
    mines: 40,
}

const handleLeftClickForIndex = (state: RootState, index: number) => {
    const { board, mineField } = state;
    const { width } = gameConfig;
    const cell = board[index];
    if (!mineField || !isEmpty(cell)) {
        return state;
    }
    const field = mineField[index];
    if (isBomb(field)) {
        return ({
            ...state,
            clockRunning: false,
            gameEnded: true,
            board: revealBoardOnDeath(board, mineField, index),
            smileyButton: SmileyButton.faceLoose,
        });
    }
    const newBoard = revealBoardOnClick(board, mineField, index, width);
    const win = isWin(newBoard, mineField);
    return ({
        ...state,
        board: newBoard,
        gameEnded: win,
        clockRunning: !win,
        smileyButton: win ? SmileyButton.faceWin : SmileyButton.faceSmile,
    });
}

export const handleLeftClick = (state: RootState, action: PayloadAction<string, Coordinate>) => {
    const { gameEnded, gameStarted, board } = state;

    const {width, height, mines} = gameConfig;

    if (gameEnded) {
        return state;
    }
    const { x, y } = action.payload;
    const index = getIndexFromCoordinates(x, y, width);
    if (!gameStarted) {
        const newMineField = initMineField(width, height, x, y, mines);
        const newBoard = revealBoardOnClick(board, newMineField, index, width);
        return ({
            ...state,
            gameStarted: true,
            mineField: newMineField,
            clockRunning: true,
            board: newBoard,
        })
    }
    return handleLeftClickForIndex(state, index);
};

export const handleRightClick = (state: RootState, action: PayloadAction<string, Coordinate>) => {
    const { board, minesCounter, gameEnded } = state;
    if (gameEnded) {
        return state;
    }
    const {width} = gameConfig;
    const { x, y } = action.payload;
    const index = getIndexFromCoordinates(x, y, width);
    const cell = board[index];

    if (isEmpty(cell)) {
        const newBoard = [...board];
        newBoard[index] = Cell.flagged;
        return ({
            ...state,
            board: newBoard,
            minesCounter: minesCounter - 1,
        });
    }

    if (isBombFlag(cell)) {
        const newBoard = [...board];
        newBoard[index] = Cell.qusetion;
        return ({
            ...state,
            board: newBoard,
            minesCounter: minesCounter + 1,
        });
    }

    if (isQuestion(cell)) {
        const newBoard = [...board];
        newBoard[index] = Cell.empty;
        return ({
            ...state,
            board: newBoard,
            minesCounter: minesCounter + 1,
        })
    }


    return state;
};
