import { expect, test } from "vitest";
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

const basicTileTypeExample = (): TileType => {
    return JSON.parse(JSON.stringify({
        claimed: null,
        id: '0',
        innerGame: basicTileInner
    }))
}

const basicSettingsExample: SettingsDataType = {
    depth: 2,
    inARowCount: 3,
    playerCount: 2,
    size: 3,
}

const newBasicTileGame = () => {
    return TileNode.importJSON(basicTileTypeExample(), basicSettingsExample)
}

test('Input of ImportJSON equals the output of ExportJSON', ()=> {
    const importObject = newBasicTileGame();
    console.log("After import: ")
    console.dir(importObject, { depth: null })
    expect(importObject.exportJSON()).toEqual(basicTileTypeExample())
})

test('Count In Direction Works', ()=> {
    const tileRoot = newBasicTileGame();

    if (tileRoot.innerGame===null) throw new Error("TileRoot inner game is null")
    tileRoot.innerGame[0][0].claimed = 0;
    tileRoot.innerGame[1][1].claimed = 0;
    tileRoot.innerGame[2][2].claimed = 0;

    const forward = tileRoot['countInDirection'](1, 1, [1, -1], 0, 0)
    const backward = tileRoot['countInDirection'](1, 1, [-1, 1], 0, 0)
    
    expect(forward).toBe(1)
    expect(backward).toBe(1)
})