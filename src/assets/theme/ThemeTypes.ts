type ThemeType = {
    theme: string;
    player1Icon: string;
    player2Icon: string;
    player3Icon: string;
    player4Icon: string;
    wildCardIcon: string;
    remainingDepthIcon: string;
    modifiedDepthIcon: string;
};

export type ThemeCompProps = {
    setTheme: (theme: ThemeType) => void;
};

export default ThemeType;
