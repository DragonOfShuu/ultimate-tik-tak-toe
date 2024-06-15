import TileNode, { TileType } from "./TileNode"
import { createContext, useContext } from 'react';

export type TileTrackerContextType = {
    tileData: TileTrackerDataType
    tileDispatch: React.Dispatch<TileTrackerActionType>
}

export type TileTrackerActionType = 
    | { type: 'update', changes: (root?: TileNode)=>void }
    | { type: 'setRootTile', root: TileNode }

export type TileTrackerDataType = {
    tileRoot: TileNode
    tileState: TileType
}

export const TileTrackerContext = createContext<TileTrackerContextType|null>(null)

export const useTileTracker = () => {
    return useContext(TileTrackerContext) as TileTrackerContextType;
}

export const tileTrackerReducer = (
    prevState: TileTrackerDataType,
    action: TileTrackerActionType
): TileTrackerDataType => {
    const prevStateString: string = JSON.stringify(prevState.tileState);

    switch (action.type) {
        case 'update': {
            action.changes(prevState.tileRoot)
            const newState = prevState.tileRoot.exportJSON();
            if (JSON.stringify(newState) === prevStateString)
                return prevState;

            return { tileRoot: prevState.tileRoot, tileState: newState };
        }
        case 'setRootTile': {
            const newRoot = action.root;
            const newState = newRoot.exportJSON();

            if (newRoot === prevState.tileRoot) return prevState;

            if (JSON.stringify(newState) === prevStateString) 
                return { tileRoot: newRoot, tileState: prevState.tileState }

            return { tileRoot: newRoot, tileState: newState };
        }
    }
}

export default TileTrackerContext;