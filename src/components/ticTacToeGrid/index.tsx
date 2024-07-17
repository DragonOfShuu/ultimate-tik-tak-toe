import { useMemo } from "react";
import { useGameManager } from "../../contexts/gameManager";
import Tile from "../tile";
import { convertIndexToChar } from "../../contexts/gameManager/TileNode";

type Props = {
    className?: string;
    id?: string
};

const useGridSections = (width: number): string => {
    let returnable = '';
    for (let i=0; i<width; i++) {
        returnable+=`${Math.round((1/width)*100)}% `
    }
    return returnable;
}

const TicTacToeGrid = ({id, className}: Props) => {
    const { gameState } = useGameManager();
    const thisId = useMemo(()=> id??'', [id]);
    const tileInnerCount = useMemo(()=> gameState.settings.size**2, [gameState.settings.size])

    const gridTemplates = useGridSections(gameState.settings.size);

    console.log(gameState.tileState)

    return (
        <div className={className}>
            <div className={`size-full grid`} style={{gridTemplateRows: gridTemplates, gridTemplateColumns: gridTemplates}}>
                {
                    Object.keys([...Array(tileInnerCount)]).map((idAddon)=> {
                        const newTileId = thisId+convertIndexToChar(Number.parseInt(idAddon));
                        return <Tile tileId={newTileId} key={newTileId} />
                    })
                }
            </div>
        </div>
    );
};

export default TicTacToeGrid;
