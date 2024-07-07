import ThemeType from "../../assets/theme/ThemeTypes";

/**
 * Gets the theme icon for this player. If the index is -1,
 * the wildcard icon will be used.
 * 
 * @param theme The current enabled theme pack
 * @param playerIndex Player index to get
 * @returns A string with the location of the player icon
 */
export const getPlayerIcon = (theme: ThemeType, playerIndex: number): string => {
    const iconList = [ theme.player1Icon, theme.player2Icon, theme.player3Icon, theme.player4Icon ]
    return playerIndex===-1?theme.wildCardIcon:iconList[playerIndex]
}