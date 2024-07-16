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

export const warpGame = (root: TileNode, warp: (innerGame: TileNode[][]) => TileNode[][], depth: number = Infinity, id: string|null = null): TileNode => {
    if (!root.innerGame) return root;
    if (depth===0) return root;

    const warpRoot = !id?root:root.getById(id);
    if (!warpRoot.innerGame) return root;

    warpRoot.innerGame = warpRoot.innerGame.map((row) => row.map((tile) => warpGame(tile, warp, depth-1)))
    warpRoot.innerGame = warp(root.innerGame);

    return root;
}

export const warpAll = (root: TileNode, warp: (innerGame: TileNode[][]) => TileNode[][]): TileNode => {
    return warpGame(root, warp)
}

export const forWarpAll = (root: TileNode, warp: (x: number, y: number, tile: TileNode) => TileNode, depth: number = Infinity, id: string|null = null): TileNode => {
    return warpGame(root, (innerGame)=> {
        return innerGame.map((row, y) => row.map((tile, x)=> {
            return warp(x, y, tile);
        }))
    }, depth, id)
}

export const warpTileTypeGame = (root: TileType, warp: (innerGame: TileType[]) => TileType[], depth: number = Infinity, id: string|null = null): TileType => {
    if (!root.innerGame) return root;
    if (depth===0) return root;

    const warpRoot = !id?root:getTileById(root, id);
    if (!warpRoot.innerGame) return root;

    warpRoot.innerGame = warpRoot.innerGame.map((tile)=> warpTileTypeGame(tile, warp, depth-1))
    warpRoot.innerGame = warp(warpRoot.innerGame);

    return root;
}

export const warpAllTileType = (root: TileType, warp: (innerGame: TileType[]) => TileType[]): TileType => {
    return warpTileTypeGame(root, warp);
}

export const forWarpAllTileType = (root: TileType, warp: (index: number, tile: TileType) => TileType, depth: number = Infinity, id: string|null = null): TileType => {
    return warpTileTypeGame(root, (innerGame)=> {
        return innerGame.map((tile, index) => warp(index, tile))
    }, depth, id)
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
export const warpTileTypeId = (id: string, tileRoot: TileType, warp: (innerGame: TileType[]) => TileType[]): TileType => {
    return warpTileTypeGame(tileRoot, warp, 1, id)
}

export const warpGameId = (id: string, tileRoot: TileNode, warp: (innerGame: TileNode[][]) => TileNode[][]): TileNode => {
    return warpGame(tileRoot, warp, 1, id);
}