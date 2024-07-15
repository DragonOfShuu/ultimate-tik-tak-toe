import { initGameManager } from "../../../contexts/gameManager";
import TileNode, { getTileById, TileType } from "../../../contexts/gameManager/TileNode";
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

export const warpAll = (root: TileNode, warp: (innerGame: TileNode[][]) => TileNode[][]): TileNode => {
    if (!root.innerGame) return root;
    
    root.innerGame = root.innerGame.map((row) => row.map((tile) => warpAll(tile, warp)))
    root.innerGame = warp(root.innerGame)
    
    return root;
}

export const forWarpAll = (root: TileNode, warp: (x: number, y: number, tile: TileNode) => TileNode): TileNode => {
    return warpAll(root, (innerGame)=> {
        return innerGame.map((row, y) => row.map((tile, x)=> {
            return warp(x, y, tile);
        }))
    })
}

export const warpAllTileType = (root: TileType, warp: (innerGame: TileType[]) => TileType[]): TileType => {
    if (!root.innerGame) return root;

    root.innerGame = root.innerGame.map((tile)=> warpAllTileType(tile, warp))
    root.innerGame = warp(root.innerGame)

    return root;
}

export const forWarpAllTileType = (root: TileType, warp: (index: number, tile: TileType) => TileType): TileType => {
    return warpAllTileType(root, (innerGame)=> {
        return innerGame.map((tile, index) => warp(index, tile))
    })
}

export const basicTileType = (warpGames?: (innerGame: TileType[]) => TileType[]): TileType => {
    const newState = initGameManager(basicSettingsExample).tileState;
    if (!warpGames) return newState;
    return warpAllTileType(newState, warpGames);
}

export const newBasicTileGame = () => {
    return TileNode.importJSON(basicTileType(), basicSettingsExample)
}

/**
 * Warps the inner game of the given id. This function returns back the root
 * @param id id of the tile to warp
 * @param tileRoot the root tile to warp from
 * @param warp function to warp using
 * @returns the root
 */
export const warpId = (id: string, tileRoot: TileType, warp: (innerGame: TileType[]) => TileType[]): TileType => {
    const ref = getTileById(tileRoot, id);
    if (ref.innerGame===null) throw new Error("Referenced tile must have an innerGame")
    const newInner = warp(ref.innerGame);
    ref.innerGame = newInner;
    return tileRoot;
}
