import {FC} from "react";
import {getCellStatus, isLeftDown, isLeftPressed, isNeighbourPressed, isRightDown} from "../state/selector";
import {useDispatch, useSelector} from "react-redux";
import {Cell} from "../models/cell";
import {
    onCellBothClick,
    onCellLeftClick,
    onCellRightClick,
    onMouseDown,
    onMouseEnter,
    onMouseUp
} from "../state/actions";
import {getMouseKey, MouseKey} from "../models/mouse";

type CellProps = {
    x: number;
    y: number;
}

const CellComponent: FC<CellProps> = ({x, y}) => {
    const key = `${x}_${y}`;
    const dispatch = useDispatch();
    let cellStatus = useSelector(getCellStatus(x, y));
    const leftPressed = useSelector(isLeftPressed(key));
    const rightDown = useSelector(isRightDown);
    const leftDown = useSelector(isLeftDown);
    const neighbourPressed = useSelector(isNeighbourPressed(key));

    if (cellStatus === Cell.empty) {
        if (leftPressed || (leftDown && rightDown && neighbourPressed)) {
            cellStatus = Cell.pressed;
        }
    }


    return(
        <div
            key={key}
            className={`square ${cellStatus}`}
            onContextMenu={e => {e.preventDefault();}}
            onMouseDown={(e) => {
                dispatch(onMouseDown({ key: getMouseKey(e), target: key }));
                e.stopPropagation();
            }}
            onMouseUp={(e) => {
                const mouseKey = getMouseKey(e);
                dispatch(onMouseUp({ key: mouseKey, target: key }));
                if (mouseKey === MouseKey.LEFT) {
                    if (rightDown) {
                        dispatch(onCellBothClick(x, y))
                    } else {
                        dispatch(onCellLeftClick(x, y));
                    }
                } else if (mouseKey === MouseKey.RIGHT) {
                    if (leftDown) {
                        dispatch(onCellBothClick(x, y))
                    } else {
                        dispatch(onCellRightClick(x, y));
                    }
                }
                e.stopPropagation();
            } }
            onMouseOver={(e) => {
                dispatch(onMouseEnter({ target: key }));
                e.stopPropagation();
            }}
        />
    )
}

export default CellComponent;