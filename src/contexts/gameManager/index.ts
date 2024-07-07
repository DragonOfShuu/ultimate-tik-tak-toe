import { SettingsDataType } from "../settings";
import TileNode, { TileType } from "./TileNode";
import { createContext, useContext } from "react";

export type GameManagerContextType = {
    gameState: GameManagerDataType;
    gameStateDispatch: React.Dispatch<GameManagerActionType>;
};

export type GameManagerActionType =
    | { type: "setRootTile"; root: TileNode } 
    | { type: "click"; tileId: string };

export type GameManagerDataType = {
    settings: SettingsDataType;
    tileRoot: TileNode;
    tileState: TileType;
    currentPlayerTurn: number;
    currentTileFocus: string;
};

export const GameManagerContext = createContext<GameManagerContextType | null>(
    null,
);

export const useGameManager = () => {
    return useContext(GameManagerContext) as GameManagerContextType;
};

export const initGameManager = (
    settings: SettingsDataType,
): GameManagerDataType => {
    const initRoot = new TileNode("", null, settings.depth, settings);

    return {
        settings: settings,
        tileRoot: initRoot,
        tileState: initRoot.exportJSON(),
        currentPlayerTurn: 0,
        currentTileFocus: "",
    };
};

export const nextPlayer = (playerCount: number, currentPlayerIndex: number) => {
    const nextIndex = currentPlayerIndex + 1;
    return nextIndex % playerCount;
};

export const gameManagerReducer = (
    prevState: GameManagerDataType,
    action: GameManagerActionType,
): GameManagerDataType => {
    switch (action.type) {
        case "setRootTile": {
            const newRoot = action.root;
            const newState = newRoot.exportJSON();

            if (newRoot === prevState.tileRoot) return prevState;

            // If the root is different and the new state has changed
            return {
                settings: prevState.settings,
                tileRoot: newRoot,
                tileState: newState,
                currentPlayerTurn: prevState?.currentPlayerTurn ?? 0,
                currentTileFocus: prevState?.currentTileFocus ?? "",
            };
        }

        case "click": {
            console.log("click ran")
            if (prevState === null)
                throw new Error(
                    "Click was ran when a game was not initialized",
                );

            // If we somehow cliked a tile that was not in focus, ignore this dispatch
            if (action.tileId.length !== prevState.currentTileFocus.length + 1)
                return prevState;

            const newTileRoot = TileNode.importJSON(prevState.tileRoot.exportJSON(), prevState.settings);
            const tileRef = newTileRoot.getById(action.tileId);
            // If tile is already claimed, ignore this
            if (tileRef.claimed !== null) return prevState;

            // If tile clicked has an inner game
            if (tileRef.innerGame !== null)
                return {
                    ...prevState,
                    tileRoot: newTileRoot,
                    currentTileFocus: tileRef.id,
                    currentPlayerTurn: nextPlayer(
                        prevState.settings.playerCount,
                        prevState.currentPlayerTurn,
                    ),
                };

            // What happens if we click a tile without an inner game, that is unclaimed
            const newFocus = tileRef.claim(prevState.currentPlayerTurn);
            const newTileState = newTileRoot.exportJSON();
            console.log("Tile with no inner game was clicked. Player should now be: ", nextPlayer(prevState.settings.playerCount, prevState.currentPlayerTurn))
            const newStateAfterClick = {
                ...prevState,
                tileRoot: newTileRoot,
                tileState: newTileState,
                currentPlayerTurn: nextPlayer(
                    prevState.settings.playerCount,
                    prevState.currentPlayerTurn,
                ),
                currentTileFocus: newFocus,
            };
            console.log("New state after click: ", newStateAfterClick)
            return newStateAfterClick;
        }
    }
};

export default GameManagerContext;
