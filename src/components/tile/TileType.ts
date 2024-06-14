import { SettingsDataType } from "../../contexts/settings"

export type TileNodeConstructType = 
    | [ id: string, parent: TileNode|null, innerGame: TileNode[][], settings: SettingsDataType, ]
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

    // claim(playerInd: number) {
    //     this.claimed
    // }

    exportJSON(): object {
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
}

export default TileNode;