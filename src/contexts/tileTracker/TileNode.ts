import { SettingsDataType } from "../settings"

export type TileNodeConstructType = 
    | [ id: string, parent: TileNode|null, innerGame: TileNode[][]|null, settings: SettingsDataType, ]
    | [ id: string, parent: TileNode|null, depthRemaining: number, settings: SettingsDataType, ]

export const convertDigitToCoords = (digit: number, maxXSize: number) => {
    const y = Math.floor(digit / maxXSize);
    const x = digit % maxXSize;
    return {x, y};
}

export const convertCoordsToDigit = (x: number, y: number, maxXSize: number) => {
    return ((y * maxXSize) + x)
}

/**
 * Tiles will use an Object-Oriented solution, where the reducer 
 * function from a dispatcher has a type called "update". For 
 * "update", you'll pass a function where you can manipulate the
 * nodes. This gives us the chance to generate new JSON for the
 * state. 
 */

/**
 * The reason we don't just check all rows or diagonals
 * is so that later it's easier to implement a shape 
 * requirement, instead of just a "in a row" requirement
 */ 

export type TileType = {
    id: string,
    claimed: number|null,
    innerGame: TileType[][]|null
}

class TileNode {
    innerGame: TileNode[][]|null
    id: string
    parent: TileNode|null
    settings: SettingsDataType
    claimed: number|null

    constructor(...options: TileNodeConstructType) {
        // initialize the constants
        this.id = options[0];
        this.parent = options[1];
        this.settings = options[3];
        this.claimed = null

        // If it is not relative to depth, and 
        // instead we are given the next inner game
        if (typeof options[2] !== 'number') {
            this.innerGame = options[2];
            return;
        }

        const depth = options[2];

        if (depth === 0) {
            this.innerGame = null;
            return;
        }

        // Create a new inner game
        const innerGame: TileNode[][] = [];
        for (let y = 0; y < this.settings.y; y++) {
            for (let x = 0; x < this.settings.x; x++) {
                const idAddon = convertCoordsToDigit(x, y, this.settings.x).toString();
                innerGame[y][x] = new TileNode(this.id+idAddon, this, depth-1, this.settings);
            }
        }
        
        this.innerGame = innerGame;
    }

    getById(id: string): TileNode {
        if (!id) return this;
        if (this.innerGame===null) 
            throw new Error('The given string id does not correspond to a real node.')

        const thisDigit = Number.parseInt(id[0]);
        const {x, y} = convertDigitToCoords(thisDigit, this.settings.x)
        return this.innerGame[y][x].getById(id.slice(1))
    }

    claim(playerInd: number|null) {
        this.claimed = playerInd;
        this.parent?.checkClaim();
    }

    /**
     * Check if the lower game has a winner.
     * 
     * If so, check the claim of the next parent
     */
    checkClaim() {
        if (!this.innerGame) throw new Error("Checking claims on lower board, but higher board doesn't have a lower board.")
        if (this.claimed !== null) { 
            this.parent?.checkClaim()
            return;
        }

        let hasClaim: null|number = null;
        this.innerGame.forEach((row, y) => {
            if (hasClaim!==null) return
            row.forEach((_, x)=> {
                if (hasClaim!==null) return;
                hasClaim = this.checkNeighborClaims(x, y);
            })
        })

        if (hasClaim===this.claimed) return
        this.claim(hasClaim);
        this.parent?.checkClaim();
    }

    /**
     * Checks tiles neighboring the given tile origin. If
     * the neighboring tiles makes a valid row in any direction,
     * it will return the playerID of the claimed tiles. Null
     * otherwise.
     * 
     * SHOULD BE RAN BY THE PARENT
     * @param x origin x
     * @param y origin y
     * @returns the claim by the player if there is a valid row
     */
    checkNeighborClaims(x: number, y: number): number|null {
        // We are inside parent, but we are grabbing refs to 
        // origin child
        if (!this.innerGame) throw new Error("Ran a check neighbors when there are no children to search")
        const child = this.innerGame[y][x];

        // If child is unclaimed, we know there are no claims in a row here
        if (child.claimed===null) return null;

        // These are the directions we need to check
        const directions: [x: number, y: number][] = [[-1, 0], [-1, 1], [0, 1], [1, 1]];

        for (const dir of directions) {
            const leftCount = this.countInDirection(x, y, dir, child.claimed, 0)
            // @ts-expect-error number[] and [x: number, y: number] are the same in this case
            const rightCount = this.countInDirection(x, y, dir.map((v)=> v*-1), child.claimed, 0)
            const rowTotal = leftCount + rightCount + 1;

            if (rowTotal < this.settings.inARowCount) continue;

            return child.claimed;
        }

        return null;
    }

    /**
     * Finds the amount of same times in a row
     * @param x current tile x
     * @param y current tile y
     * @param dir direction we are searching
     * @param claimID the claim we are looking for
     * @param currentCount the amount in a row we've found so far
     * @returns The amount of tiles with the same claim in a direction
     */
    countInDirection(x: number, y: number, dir: [x: number, y: number], claimID: number, currentCount: number): number {
        if (!this.innerGame) 
            throw new Error("'countInDirection' was ran on a node with no children to view.")
        const child = this.innerGame[y][x];
    
        // If we reached the edge, there are no more children to find
        if (!child) return currentCount
        if (child.claimed !== claimID) return currentCount;

        return this.countInDirection(x+dir[0], y+dir[1], dir, claimID, currentCount+1);
    }

    exportJSON(): TileType {
        const inner = this.innerGame?.map((tiles) => {
            return tiles.map((tile) => {
                return tile.exportJSON();
            })
        }) || null;

        return {
            id: this.id,
            claimed: this.claimed,
            innerGame: inner,
        }
    }

    public static importJSON(x: TileType, settings: SettingsDataType): TileNode {
        const newInnerGame = x.innerGame?.map((row) => (
            row.map(tile=> this.importJSON(tile, settings))
        )) || null
        
        return new TileNode(x.id, null, newInnerGame, settings)
    }
}

export default TileNode;
