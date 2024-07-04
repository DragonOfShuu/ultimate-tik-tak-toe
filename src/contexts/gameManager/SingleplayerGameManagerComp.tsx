import { useReducer, ReactNode } from "react";
import GameManagerContext, { gameManagerReducer, initGameManager } from ".";
import { SettingsDataType } from "../settings";

type Props = {
    settings: SettingsDataType;
    children: ReactNode;
};

const SingleplayerGameManagerComp = (props: Props) => {
    const [tiles, tilesDispatch] = useReducer(
        gameManagerReducer,
        initGameManager(props.settings),
    );

    return (
        <GameManagerContext.Provider
            value={{ gameState: tiles, gameStateDispatch: tilesDispatch }}
        >
            {props.children}
        </GameManagerContext.Provider>
    );
};

export default SingleplayerGameManagerComp;
