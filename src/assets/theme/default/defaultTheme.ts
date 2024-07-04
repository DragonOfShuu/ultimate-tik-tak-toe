import ThemeType from "../ThemeTypes";
import TicTacToeX from "./TicTacToeX.svg";
import TicTacToeO from "./TicTacToeO.svg";
import TicTacToeTri from "./TicTacToeTri.svg";
import TicTacToeSquare from "./TicTacToeSquare.svg";
import TicTacToeWildcard from "./TicTacToeWildcard.svg";
import TicTacToeRemainingDepth from "./TicTacToeRemainingDepth.svg";
import TicTacToeModifiedDepth from "./TicTacToeModifiedDepth.svg";

const defaultTheme: ThemeType = {
    theme: "default",
    player1Icon: TicTacToeX,
    player2Icon: TicTacToeO,
    player3Icon: TicTacToeSquare,
    player4Icon: TicTacToeTri,
    wildCardIcon: TicTacToeWildcard,
    remainingDepthIcon: TicTacToeRemainingDepth,
    modifiedDepthIcon: TicTacToeModifiedDepth,
};

export default defaultTheme;
