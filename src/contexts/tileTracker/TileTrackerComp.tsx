import { useReducer, ReactNode } from "react"
import TileTrackerContext, { tileTrackerReducer } from "."
import TileType from "../../components/tile/TileType"

type Props = {
    defaultTiles: TileType[][]
    children: ReactNode
}

const TileTrackerComp = (props: Props) => {
    const [tiles, tilesDispatch] = useReducer(tileTrackerReducer, {tiles: props.defaultTiles});

    return (
        <TileTrackerContext.Provider value={{tileData: tiles, tileDispatch: tilesDispatch}}>
            {props.children}
        </TileTrackerContext.Provider>
    )
}

export default TileTrackerComp;