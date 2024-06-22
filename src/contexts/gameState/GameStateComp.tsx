import { useReducer, ReactNode, useMemo } from "react"
import GameStateContext, { GameStateDataType, gameStateReducer } from "."
import TileNode from "./TileNode"

type Props = {
    defaultTileRoot: TileNode
    children: ReactNode
}

const GameStateComp = (props: Props) => {
    const defaultState: GameStateDataType = useMemo(()=> {
        return {
            tileRoot: props.defaultTileRoot, 
            tileState: props.defaultTileRoot.exportJSON(), 
            currentPlayerTurn: 0, 
            currentTileFocus: ''
        }
    }, [props.defaultTileRoot])

    const [tiles, tilesDispatch] = useReducer(gameStateReducer, defaultState);

    return (
        <GameStateContext.Provider value={{gameState: tiles, gameStateDispatch: tilesDispatch}}>
            {props.children}
        </GameStateContext.Provider>
    )
}

export default GameStateComp;