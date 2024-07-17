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
            <div className={`size-full rounded-lg flex flex-row items-center gap-6 p-4`}>
                <img src={currIcon} className={`h-full w-auto`} />
                <h2 className={``}>{`It is your turn!`}</h2>
            </div>
        </div>
    );
};

export default PlayerTurnCard;
