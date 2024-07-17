import SpecialButton from "../../components/SpecialButton";
import { usePager } from "../../contexts/pager";
import NumberOption from "./NumberOption";

type Props = {
    className?: string;
};

const StartPage = (props: Props) => {
    const { setPage } = usePager();

    const handleSubmit = () => {
        setPage("game");
    };

    const handleBack = () => {
        setPage("title");
    };

    return (
        <div className={props.className}>
            <div className="flex flex-col items-center gap-3">
                <h1>Game Settings</h1>
                <div
                    className={`flex flex-col items-stretch gap-2 w-64 text-xl`}
                >
                    <NumberOption defaultValue={3} name="size" />
                    <NumberOption defaultValue={3} name="depth" />
                    <NumberOption
                        defaultValue={3}
                        name="inARowCount"
                        displayName="In a row"
                    />
                    <NumberOption
                        defaultValue={2}
                        name="playerCount"
                        displayName="players"
                    />
                </div>
                <div className={`flex flex-row gap-5`}>
                    <SpecialButton onClick={handleBack}>Back</SpecialButton>
                    <SpecialButton onClick={handleSubmit} importance>
                        Start Game
                    </SpecialButton>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
