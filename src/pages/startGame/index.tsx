import SpecialButton from "../../components/SpecialButton";
import { usePager } from "../../contexts/pager";
import NumberOption from "./NumberOption";

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
            <div className="flex flex-col items-center gap-3">
                <h1>
                    Game Settings
                </h1>
                <div className={`flex flex-col items-stretch gap-2 w-48`}>
                    <NumberOption 
                        defaultValue={3}
                        name="x"
                    />
                    <NumberOption 
                        defaultValue={3}
                        name="y"
                    />
                    <NumberOption 
                        defaultValue={3}
                        name="depth"
                    />
                    <NumberOption 
                        defaultValue={3}
                        name="depth"
                    />
                </div>
                <SpecialButton onClick={handleSubmit}>
                    Start Game
                </SpecialButton>
            </div>
        </div>
    )
}

export default StartPage;