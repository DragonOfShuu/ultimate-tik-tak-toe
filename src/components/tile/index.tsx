import { useTileTracker } from "../../contexts/tileTracker"

type Props = {
    className?: string
    onClick?: (e: React.MouseEvent) => unknown
}

const Tile = (props: Props) => {
    const {tileData, tileDispatch} = useTileTracker();

    return (
        <div className={props.className}>
            <button className={`hover:bg-white/50`} onClick={props.onClick}>

            </button>
        </div>
    )
}

export default Tile;
