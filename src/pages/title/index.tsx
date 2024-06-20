import SpecialButton from "../../components/SpecialButton";
import { usePager } from "../../contexts/pager";

type Props = {
    className?: string
}

const TitlePage = (props: Props) => {
    const {setPage} = usePager();

    const switchToStartGame = () => {
        setPage('startGame');
    }

    return (
        <div className={props.className}>
            <div className="flex flex-col items-center gap-48">
                <h1 className={``}>
                    {`Title Page`}
                </h1>
                <SpecialButton onClick={switchToStartGame} className={`h-24 w-48 text-2xl`}>
                    {`Play`}
                </SpecialButton>
            </div>
        </div>
    )
}

export default TitlePage;