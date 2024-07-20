import { useEffect, useRef, useState } from "react";
import { useGameManager } from "../../contexts/gameManager";
import { getPlayerIcon } from "../../contexts/theme/utils";
import { useTheme } from "../../contexts/theme";
import styles from './index.module.sass';

// type Props = Record<string, never>

const useWinnerDeterminner = (onWin?: (winnerId: number)=> unknown) => {
    const { gameState } = useGameManager();
    const [winner, setWinner] = useState<number|null>(null);

    useEffect(()=> {
        const rootTile = gameState.tileState;
        if (rootTile.claimed===null) return;
        setWinner(rootTile.claimed);
        onWin?.(rootTile.claimed);
    }, [gameState.tileState, onWin])

    return { winner };
}

const WinDialog = () => {
    const winDialogElement = useRef<HTMLDialogElement>(null);
    const {theme} = useTheme();

    const onWin = () => {
        winDialogElement.current?.showModal();
    }

    const { winner } = useWinnerDeterminner(onWin);

    return (
        <dialog ref={winDialogElement} className={`${styles.winDialog}`}>
            <div className={`bg-sub-alt p-5 flex flex-row items-center gap-2 rounded-xl`}>
                <img src={winner!==null?getPlayerIcon(theme, winner):''} alt={`Player ${winner} won the game!`} className={`w-32 h-auto`} />
                <h1>
                    {`Player ${winner} has one the game!`}
                </h1>
            </div>
        </dialog>
    )
}

export default WinDialog;