import PlayerTurnCard from "../../components/PlayerTurnCard";
import TicTacToeGrid from "../../components/ticTacToeGrid";
import { useGameManager } from "../../contexts/gameManager"

type Props = {
    className?: string
}

const GameDisplay = (props: Props) => {
    const {gameState} = useGameManager();

    return (
        <div className={props.className}>
            <TicTacToeGrid id={gameState.currentTileFocus} className={`w-96 h-96`} />
            <div className={`absolute`}>
                <div className="left-0 bottom-0">
                    <PlayerTurnCard className={`w-48 h-24`} />
                </div>
            </div>
        </div>
    )
}

export default GameDisplay;