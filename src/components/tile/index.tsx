import { useMemo } from "react";
import { useGameManager } from "../../contexts/gameManager";
import { useTheme } from "../../contexts/theme";
import useGetTileIcon from "./useGetTileIcon";

type Props = {
    className?: string;
    onClick?: (e: React.MouseEvent) => unknown;
    tileId: string;
};

const Tile = (props: Props) => {
    const { gameState, gameStateDispatch } =
        useGameManager();
    const { theme } = useTheme();

    const correTile = useMemo(() => gameState.tileRoot.getById(props.tileId), [gameState.tileRoot, props.tileId]);
    const tileIcon = useGetTileIcon(theme, correTile);

    const handleClick = (e: React.MouseEvent) => {
        props.onClick?.(e);
        gameStateDispatch({ type: 'click', tileId: props.tileId });
    }

    return (
        <div className={props.className}>
            <button
                className={`size-full hover:bg-white/50`}
                onClick={handleClick}
            >
                {
                    tileIcon===null?<></>:
                        <img src={tileIcon} className={`size-full object-contain`} />
                }
            </button>
        </div>
    );
};

export default Tile;
