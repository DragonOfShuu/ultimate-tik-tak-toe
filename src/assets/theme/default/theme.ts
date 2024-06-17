import ThemeType from "../ThemeTypes";
import TicTacToeX from './TicTacToeX.svg'
import TicTacToeO from './TicTacToeO.svg'
import TicTacToeTri from './TicTacToeTri.svg'
import TicTacToeSquare from './TicTacToeSquare.svg'

const DefaultTheme: ThemeType = {
    theme: 'default',
    player1Icon: TicTacToeX,
    player2Icon: TicTacToeO,
    player3Icon: TicTacToeSquare,
    player4Icon: TicTacToeTri,
    colors: {
        primary: {
            "50": '#ecfeff',
            "100": '#cffafe',
            "200": '#a5f3fc',
            "300": '#67e8f9',
            "400": '#22d3ee',
            "500": '#06b6d4',
            "600": '#0891b2',
            "700": '#0e7490',
            "800": '#155e75',
            "900": '#164e63',
            "950": '#083344',
        },
        secondary: {
            '50': '#ecfdf5',
            '100': '#d1fae5',
            '200': '#a7f3d0',
            '300': '#6ee7b7',
            '400': '#34d399',
            '500': '#10b981',
            '600': '#059669',
            '700': '#047857',
            '800': '#065f46',
            '900': '#064e3b',
            '950': '#022c22',
        }
    }
}

export default DefaultTheme;