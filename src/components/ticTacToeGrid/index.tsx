import { useMemo } from "react";
import { useGameManager } from "../../contexts/gameManager";
import Tile from "../tile";
import { convertDigitToCoords, convertIndexToChar } from "../../contexts/gameManager/TileNode";
import GridLine from "./GridLine";

type Props = {
    className?: string;
    id?: string;
};

const useGridSections = (width: number): string => {
    const returnable = [];
    /** The amount of lines between tiles */
    const lineCount = width-1
    /** The ratio of the lines compared to the size of tiles */
    const lineRatio = lineCount/8
    /** Width of each tile by percentage */
    const tileWidth = (1 / (width + lineRatio));
    /** Line width */
    const lineWidth = (1 - (tileWidth*width)) / lineCount
    for (let i = 0; i < width; i++) {
        returnable.push(`${Math.round(tileWidth * 100)}%`);
    }
    return returnable.join(` ${Math.round(lineWidth *100)}% `);
};

const useInnerDisplay = (size: number, startId: string): JSX.Element[] => {
    let tileCount = 0;
    const returnable: JSX.Element[] = [];
    const actualLength: number = (size*2)-1
    // Arrange Tiles
    for (let i = 0; i < actualLength**2; i++) {
        const { x, y } = convertDigitToCoords(i, actualLength);
        if (x%2!==0||y%2!==0) continue;
        const newTileId = startId + convertIndexToChar(tileCount++);
        returnable.push( <Tile tileId={newTileId} key={newTileId} style={{gridColumnStart: x+1, gridRowStart: y+1}} className={`p-2`} /> );
    }
    // Arrange Lines
    for (let i = 0; i < actualLength; i++) {
        if (i%2===0) continue;
        // Vertical
        returnable.push( <GridLine style={{gridColumnStart: i+1, gridRowStart: 1, gridRowEnd: actualLength+1}} /> )
        // Horizontal
        returnable.push( <GridLine style={{gridRowStart: i+1, gridColumnStart: 1, gridColumnEnd: actualLength+1}} /> )
    }
    console.log(returnable)
    return returnable;
}

const TicTacToeGrid = ({ id, className }: Props) => {
    const { gameState } = useGameManager();
    const thisId = useMemo(() => id ?? "", [id]);

    const gridTemplates = useGridSections(gameState.settings.size);
    const gridDisplay = useInnerDisplay(gameState.settings.size, thisId);

    console.log(gameState.tileState);

    return (
        <div className={className}>
            <div
                className={`size-full grid`}
                style={{
                    gridTemplateRows: gridTemplates,
                    gridTemplateColumns: gridTemplates,
                }}
            >
                { gridDisplay }
            </div>
        </div>
    );
};

export default TicTacToeGrid;
