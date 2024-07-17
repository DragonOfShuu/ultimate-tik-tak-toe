import { useMemo } from "react";
import { useGameManager } from "../../contexts/gameManager";
import { useTheme } from "../../contexts/theme";
import useGetTileIcon from "./useGetTileIcon";
import { getTileById } from "../../contexts/gameManager/TileNode";

type Props = {
    className?: string;
    style?: React.CSSProperties
    onClick?: (e: React.MouseEvent) => unknown;
    tileId: string;
};

const Tile = (props: Props) => {
    const { gameState, gameStateDispatch } = useGameManager();
    const { theme } = useTheme();

    const correTile = useMemo(
        () => getTileById(gameState.tileState, props.tileId),
        [gameState.tileState, props.tileId],
    );
    const isClaimed = useMemo(()=> correTile.claimed!==null, [correTile]);
    const tileIcon = useGetTileIcon(theme, correTile);

    const handleClick = (e: React.MouseEvent) => {
        props.onClick?.(e);
        gameStateDispatch({ type: "click", tileId: props.tileId });
    };

    return (
        <div className={props.className} style={props.style}>
            <button
                className={`size-full grid group ${isClaimed?`cursor-default`:``}`}
                onClick={handleClick}
            >
                {tileIcon === null ? (
                    <></>
                ) : (
                    <img
                    src={tileIcon}
                    className={`size-full object-contain`}
                    style={{gridColumn: 1, gridRow: 1}}
                    />
                )}
                <div className={`group-hover:bg-white/50 ${isClaimed?`hidden`:``} size-full rounded-lg`} style={{gridColumn: 1, gridRow: 1}} />
            </button>
        </div>
    );
};

export default Tile;
