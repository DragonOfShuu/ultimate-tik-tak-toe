import { initGameManager } from "../../../contexts/gameManager";
import TileNode, { TileType } from "../../../contexts/gameManager/TileNode";
import { SettingsDataType } from "../../../contexts/settings";

const basicTileInner: TileType[] = []
for (let index = 0; index<9; index++) {
    const claimInd = index%3;
    const claimed = claimInd===0?null:claimInd-1
    basicTileInner.push(
        {
            claimed: index>5?null:claimed,
            id: `0${index}`,
            innerGame: null,
        }
    )
}

export const basicSettingsExample: SettingsDataType = {
    depth: 2,
    inARowCount: 3,
    playerCount: 2,
    size: 3,
}

export const warpAllGames = (root: TileType, warp: (innerGame: TileType[]) => TileType[]): TileType => {
    if (!root.innerGame) return root;

    root.innerGame = root.innerGame.map((x) => warpAllGames(x, warp))
    root.innerGame = warp(root.innerGame)

    return root;
}

export const basicTileType = (warpGames?: (innerGame: TileType[]) => TileType[]): TileType => {
    const newState = initGameManager(basicSettingsExample).tileState;
    if (!warpGames) return newState;
    return warpAllGames(newState, warpGames);
}

export const newBasicTileGame = () => {
    return TileNode.importJSON(basicTileType(), basicSettingsExample)
}