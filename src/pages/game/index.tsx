import SingleplayerGameManagerComp from "../../contexts/gameManager/SingleplayerGameManagerComp";
import { useSettings } from "../../contexts/settings";
import GameDisplay from "./GameDisplay";

type Props = {
    className?: string;
};

const GamePage = (props: Props) => {
    const { settings } = useSettings();

    return (
        <SingleplayerGameManagerComp settings={settings}>
            <div className={props.className}>
                <GameDisplay />
            </div>
        </SingleplayerGameManagerComp>
    );
};

export default GamePage;
