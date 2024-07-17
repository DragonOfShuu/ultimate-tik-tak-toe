type Props = {
    style?: React.CSSProperties,
    className?: string,
}

const GridLine = (props: Props) => {
    return (
        <div className={props.className} style={props.style}>
            <div className={`size-full rounded-full bg-sub`} />
        </div>
    )
}

export default GridLine;