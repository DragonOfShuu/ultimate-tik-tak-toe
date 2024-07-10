import { expect, test } from "vitest";
import { basicTileType, newBasicTileGame } from "./TileNodeTestToolkit";


test('Input of ImportJSON equals the output of ExportJSON', ()=> {
    const importObject = newBasicTileGame();
    console.log("After import: ")
    console.dir(importObject, { depth: null })
    expect(importObject.exportJSON()).toEqual(basicTileType())
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