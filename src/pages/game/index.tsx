import SingleplayerGameManagerComp from "../../contexts/gameManager/SingleplayerGameManagerComp";
import { useSettings } from "../../contexts/settings";

type Props = {
    className?: string;
};

const GamePage = (props: Props) => {
    const { settings } = useSettings();

    return (
        <SingleplayerGameManagerComp settings={settings}>
            <div className={props.className}>
                <div>GamePage</div>
            </div>
        </SingleplayerGameManagerComp>
    );
};

export default GamePage;
