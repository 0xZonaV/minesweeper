import Cell from "./Cell";
import {gameConfig} from "../state/gameHelpers";
const _ = require("lodash");

const Board = () => {
    const { height, width } = gameConfig;
    const border =  (key: string) => (<div key={key} className="borderlr" />);
    const divs = [];
    for (let y = 0; y < height; ++y) {
        divs.push(border(`${y}-l`));
        for (let x = 0; x < width; ++x){
            divs.push(
                <Cell
                    key={`${y}-${x}`}
                    x={x}
                    y={y}
                />
            );
        }
        divs.push(border(`${y}-r`));
    }
    // @ts-ignore
    const line = _.range(width).map(i => <div key={i} className="bordertb" />);
    return (
        <div className="minesweeper-board" >
            {divs}
            <div className="borderbl" />
                {line}
            <div className="borderbr" />
        </div>
    );
}

export default Board;