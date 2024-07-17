import { useGameManager } from "../contexts/gameManager";
import { useTheme } from "../contexts/theme";
import { getPlayerIcon } from "../contexts/theme/utils";

type Props = {
    className?: string;
};

const PlayerTurnCard = (props: Props) => {
    const { gameState } = useGameManager();
    const { theme } = useTheme();

    const currIcon = getPlayerIcon(theme, gameState.currentPlayerTurn);

    return (
        <div className={props.className}>
            <div className={`size-full rounded-lg flex flex-row gap-2 p-4`}>
                <img src={currIcon} className={`h-full w-auto`} />
                <p>{`It is your turn!`}</p>
            </div>
        </div>
    );
};

export default PlayerTurnCard;
