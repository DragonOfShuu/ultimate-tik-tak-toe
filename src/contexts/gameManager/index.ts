import { SettingsDataType } from "../settings";
import TileNode, { TileType } from "./TileNode";
import { createContext, useContext } from "react";

export type GameManagerContextType = {
    gameState: GameManagerDataType;
    gameStateDispatch: React.Dispatch<GameManagerActionType>;
};

export type GameManagerActionType =
    | { type: "setTileState"; root: TileType }
    | { type: "click"; tileId: string };

export type GameManagerDataType = {
    settings: SettingsDataType;
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
    return {
        settings: settings,
        tileState: new TileNode(
            "",
            null,
            settings.depth,
            null,
            settings,
        ).exportJSON(),
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
        case "setTileState": {
            if (action.root === prevState.tileState) return prevState;

            // If the root is different and the new state has changed
            return {
                settings: prevState.settings,
                tileState: action.root,
                currentPlayerTurn: prevState?.currentPlayerTurn ?? 0,
                currentTileFocus: prevState?.currentTileFocus ?? "",
            };
        }

        case "click": {
            if (prevState === null)
                throw new Error(
                    "Click was ran when a game was not initialized",
                );

            // If we somehow cliked a tile that was not in focus, ignore this dispatch
            if (action.tileId.length !== prevState.currentTileFocus.length + 1)
                return prevState;

            const newTileRoot = TileNode.importJSON(
                prevState.tileState,
                prevState.settings,
            );
            const tileRef = newTileRoot.getById(action.tileId);
            // If tile is already claimed, ignore this
            if (tileRef.claimed !== null) return prevState;

            // If tile clicked has an inner game
            if (tileRef.innerGame !== null) {
                const newStateAfterInnerGame = {
                    ...prevState,
                    tileState: newTileRoot.exportJSON(),
                    currentTileFocus: tileRef.id,
                    currentPlayerTurn: nextPlayer(
                        prevState.settings.playerCount,
                        prevState.currentPlayerTurn,
                    ),
                };
                return newStateAfterInnerGame;
            }

            // What happens if we click a tile without an inner game, that is unclaimed
            const newFocus = tileRef.claim(prevState.currentPlayerTurn);
            const newTileState = newTileRoot.exportJSON();
            const newStateAfterClick = {
                ...prevState,
                tileState: newTileState,
                currentPlayerTurn: nextPlayer(
                    prevState.settings.playerCount,
                    prevState.currentPlayerTurn,
                ),
                currentTileFocus: newFocus,
            };
            return newStateAfterClick;
        }
    }
};

export default GameManagerContext;
