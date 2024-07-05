import ThemeType from "../../assets/theme/ThemeTypes";
import TileNode from "../../contexts/gameManager/TileNode";


const useGetTileIcon = (theme: ThemeType, tile: TileNode): string|null => {
    if (tile.claimed===null&&tile.innerGame) {
        return tile.isModified()?theme.modifiedDepthIcon:theme.remainingDepthIcon;
    }
    // If tile is not claimed, and there is no lower game,
    // then this tile should be empty
    if (tile.claimed===null) return null;
    if (tile.claimed===-1)
        return theme.wildCardIcon;
    
    // Now we know that the tile is claimed...
    const claimList = [ theme.player1Icon, theme.player2Icon, theme.player3Icon, theme.player4Icon ];
    return claimList[tile.claimed];
}

export default useGetTileIcon;