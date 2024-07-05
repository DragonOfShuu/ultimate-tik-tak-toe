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
        </div>
    )
}

export default GameDisplay;