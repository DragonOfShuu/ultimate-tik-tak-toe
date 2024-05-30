import TileType from "../../components/tile/TileType"
import { createContext, useContext } from 'react';

export type TileTrackerContextType = {
    tileData: TileTrackerDataType
    tileDispatch: React.Dispatch<TileTrackerActionType>
}

export type TileTrackerActionType = 
    | { type: 'setTiles', tiles: TileType[][] }

export type TileTrackerDataType = {
    tiles: TileType[][]
}

export const TileTrackerContext = createContext<TileTrackerContextType|null>(null)

export const useTileTracker = () => {
    return useContext(TileTrackerContext) as TileTrackerContextType;
}

export const tileTrackerReducer = (
    prevState: TileTrackerDataType,
    action: TileTrackerActionType
) => {
    // TODO: add functionality
    return prevState;
}

export default TileTrackerContext;