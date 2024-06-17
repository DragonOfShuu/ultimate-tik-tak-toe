
type Props = {
    className?: string
}

const TitlePage = (props: Props) => {
    return (
        <div className={props.className}>
            {`Title Page`}
        </div>
    )
}

export default TitlePage;