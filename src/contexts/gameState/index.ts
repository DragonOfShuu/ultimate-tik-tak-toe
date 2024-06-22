import TileNode, { TileType } from "./TileNode"
import { createContext, useContext } from 'react';

export type GameStateContextType = {
    gameState: GameStateDataType
    gameStateDispatch: React.Dispatch<GameStateActionType>
}

export type GameStateActionType = 
    | { type: 'update', changes: (root?: TileNode)=>void }
    | { type: 'setRootTile', root: TileNode }
    | { type: 'click', tileId: string }

export type GameStateDataType = {
    tileRoot: TileNode
    tileState: TileType
    currentPlayerTurn: number,
    currentTileFocus: string,
} | null

export const GameStateContext = createContext<GameStateContextType|null>(null)

export const useGameState = () => {
    return useContext(GameStateContext) as GameStateContextType;
}

export const gameStateReducer = (
    prevState: GameStateDataType,
    action: GameStateActionType
): GameStateDataType => {
    switch (action.type) {
        case 'update': {
            // action.changes(prevState.tileRoot)
            // const newState = prevState.tileRoot.exportJSON();
            // if (JSON.stringify(newState) === prevStateString)
            //     return prevState;

            // return { tileRoot: prevState.tileRoot, tileState: newState,  };
            throw new Error("Update was not implemented");
        }
        case 'setRootTile': {
            const newRoot = action.root;
            const newState = newRoot.exportJSON();

            if (newRoot === prevState?.tileRoot) return prevState;

            // If the root is different and the new state has changed
            return { 
                tileRoot: newRoot, 
                tileState: newState, 
                currentPlayerTurn: prevState?.currentPlayerTurn??0, 
                currentTileFocus: prevState?.currentTileFocus??'' 
            };
        }
        case 'click': {
            if (prevState===null) throw new Error("Click was ran when a game was not initialized");

            // If we somehow cliked a tile that was not in focus, ignore this dispatch
            if (action.tileId.length !== prevState.currentTileFocus.length+1) return prevState;

            const tileRef = prevState.tileRoot.getById(action.tileId);
            // If tile is already claimed, ignore this
            if (tileRef.claimed!==null) return prevState;

            if (tileRef.innerGame!==null) 
                // TODO: Allow switching current player. Maybe include the
                // settings in the game state, and separate the active state
                // separately as well.
                return {...prevState, currentTileFocus: prevState.currentTileFocus};
            
            // TODO: Code what happens if we click a tile without an inner game
            return prevState;
        }
    }
}

export default GameStateContext;
