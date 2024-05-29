
type Props = {
    className?: string
}

const Tile = (props: Props) => {
    return (
        <div className={props.className}>
            <div className={`hover:bg-white/50`}>
                
            </div>
        </div>
    )
}

export default Tile;