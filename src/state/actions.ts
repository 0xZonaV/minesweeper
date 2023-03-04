import {SmileyButton} from "../models/smile";
import {action} from "typesafe-actions";
import {MouseClickEvent} from "../models/mouse";
import {GAME_ACTION_TYPES} from "./action-types";


export const setMinesCounter = (value: number) => action(GAME_ACTION_TYPES.SET_MINES_COUNTER, value);
export const setTimeCounter = (value: number) => action(GAME_ACTION_TYPES.SET_TIME_COUNTER, value);
export const setSmileyButton = (value: SmileyButton) => action(GAME_ACTION_TYPES.SET_SMILEY_BUTTON, value);
export const onMouseDown = (event: MouseClickEvent) => action(GAME_ACTION_TYPES.ON_MOUSE_DOWN, event);
export const onMouseUp = (event: MouseClickEvent) => action(GAME_ACTION_TYPES.ON_MOUSE_UP, event);
export const onMouseEnter = (event: MouseClickEvent) => action(GAME_ACTION_TYPES.ON_MOUSE_ENTER, event);
export const clockTick = () => action(GAME_ACTION_TYPES.CLOCK_TICK);
export const onCellLeftClick = (x: number, y: number) => action(GAME_ACTION_TYPES.CELL_LEFT_CLICK, { x, y });
export const onCellRightClick = (x: number, y: number) => action(GAME_ACTION_TYPES.CELL_RIGHT_CLICK, { x, y });
export const onSmileyClick = () => action(GAME_ACTION_TYPES.SMILEY_CLICK);