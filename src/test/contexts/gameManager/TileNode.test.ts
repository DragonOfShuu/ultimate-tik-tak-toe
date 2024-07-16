import { expect, test } from "vitest";
import { basicTileType, forWarpAll, newBasicTileGame } from "./TileNodeTestToolkit";


test('Input of ImportJSON equals the output of ExportJSON', ()=> {
    const importObject = newBasicTileGame();
    console.log("After import: ")
    console.dir(importObject, { depth: null })
    expect(importObject.exportJSON()).toEqual(basicTileType())
})

test('Count In Direction Counts Correctly', ()=> {
    const tileRoot = newBasicTileGame();
    forWarpAll(tileRoot, (x, y, tile) => {
        if (x===y) tile.claimed = 0;
        return tile;
    })

    const forward = tileRoot['countInDirection'](1, 1, [1, -1], 0, 0)
    const backward = tileRoot['countInDirection'](1, 1, [-1, 1], 0, 0)
    
    expect(forward).toBe(1)
    expect(backward).toBe(1)
})

test('Count In Direction is 0 when empty', ()=> {
    const tileRoot = newBasicTileGame();
    
    const forward = tileRoot['countInDirection'](1, 1, [1, -1], 0, 0)
    const backward = tileRoot['countInDirection'](1, 1, [-1, 1], 0, 0)
    
    expect(forward).toBe(0);
    expect(backward).toBe(0);
})

test('Check Neighbor Claims Detects Diagonal Row', () => {
    const tileRoot = newBasicTileGame();
    forWarpAll(tileRoot, (x, y, tile) => {
        if (x===y) tile.claimed = 0;
        return tile;
    })

    const foundClaim = tileRoot['checkNeighborClaims'](0, 0);
    expect(foundClaim).toBe(0)
})

test('Check Neighbor Claims Detects No Winner', () => {
    const tileRoot = newBasicTileGame();

    const foundClaim = tileRoot['checkNeighborClaims'](0, 0);
    expect(foundClaim).toBe(null)
})

test('Check Neighbor Claims Detects No Winner - 2', () => {
    const tileRoot = newBasicTileGame();
    forWarpAll(tileRoot, (x, y, tile) => {
        if (y===1&&x!==2) tile.claimed = 0;
        return tile;
    })

    const foundClaim = tileRoot['checkNeighborClaims'](0, 0);
    expect(foundClaim).toBe(null)
})

test('Check Neighbor Claims Detects No Winner - 3', () => {
    const tileRoot = newBasicTileGame();
    forWarpAll(tileRoot, (x, y, tile) => {
        if (y===0&&x===2) {
            tile.claimed = 1
        } else if (y===0) tile.claimed = 0;
        return tile;
    })

    const foundClaim = tileRoot['checkNeighborClaims'](0, 0);
    expect(foundClaim).toBe(null)
})

test('Check Claim Returns Correct Focus', ()=> {
    const newTileRoot = () => forWarpAll(newBasicTileGame(), (_, y, tile) => {
        if (y===0) tile.claimed = 0;
        return tile;
    }, 1, '0')

    /**
     * x x x
     * - - -
     * - - -
     */
    let focus = newTileRoot().getById('00')['checkClaim']();
    expect(focus).toBe('')

    /**
     * o x x
     * - - -
     * - - -
     */
    const tileRoot1 = newTileRoot();
    tileRoot1.getById('00').claimed = 1;
    focus = tileRoot1.getById('00')['checkClaim']();
    expect(focus).toBe('0');
})