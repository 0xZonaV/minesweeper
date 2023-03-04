import Header from "./Header";
import Board from "./Board";
import {gameConfig} from "../state/gameHelpers";

const BORDER_WIDTH = 10;
const BORDER_HEIGHT = 10;
const FIELD_WIDTH = 16;
const FIELD_HEIGHT = 16;
const HEADER_HEIGHT = 32;

const calcStyle = () => {
    const widthFieldsNum = gameConfig.width;
    const heightFieldsNum = gameConfig.height;
    const width = 2 * BORDER_WIDTH + widthFieldsNum * FIELD_WIDTH;
    const height = 3 * BORDER_HEIGHT + FIELD_HEIGHT * heightFieldsNum + HEADER_HEIGHT;
    return { width, height };
}

const Game = () => {
    return(
        <div id="game" className="msw" style={calcStyle()}>
            <Header />
            <Board />
        </div>
    )
}

export default Game;