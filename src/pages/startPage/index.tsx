import SpecialButton from "../../components/SpecialButton";
import { usePager } from "../../contexts/pager";

type Props = {
    className?: string
}

const StartPage = (props: Props) => {
    const {setPage} = usePager();

    const handleSubmit = () => {
        setPage('game')
    }

    return (
        <div className={props.className}>
            <div>
                <SpecialButton onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default StartPage;