import { useGameManager } from "../../contexts/gameManager";

type Props = {
    className?: string;
    onClick?: (e: React.MouseEvent) => unknown;
    tileId: string;
};

const Tile = (props: Props) => {
    const { gameState: tileData, gameStateDispatch: tileDispatch } =
        useGameManager();

    const correTile = tileData.tileRoot.getById(props.tileId);

    return (
        <div className={props.className}>
            <button
                className={`hover:bg-white/50`}
                onClick={props.onClick}
            ></button>
        </div>
    );
};

export default Tile;
