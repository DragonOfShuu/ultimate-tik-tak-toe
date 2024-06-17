type ThemeType = {
    theme: string,
    // HIGHER === DARKER
    colors: {
        primary: {
            50: string,
            100: string,
            200: string,
            300: string,
            400: string,
            500: string,
            600: string,
            700: string,
            800: string,
            900: string,
            950: string,
        },
        secondary: {
            50: string,
            100: string,
            200: string,
            300: string,
            400: string,
            500: string,
            600: string,
            700: string,
            800: string,
            900: string,
            950: string,
        },
    },
    player1Icon: string,
    player2Icon: string,
    player3Icon: string,
    player4Icon: string,
}

export default ThemeType;