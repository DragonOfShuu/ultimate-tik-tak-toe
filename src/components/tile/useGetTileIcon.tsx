import ThemeType from "../../assets/theme/ThemeTypes";
import TileNode from "../../contexts/gameManager/TileNode";
import { getPlayerIcon } from "../../contexts/theme/utils";


const useGetTileIcon = (theme: ThemeType, tile: TileNode): string|null => {
    if (tile.claimed===null&&tile.innerGame) {
        return tile.isModified()?theme.modifiedDepthIcon:theme.remainingDepthIcon;
    }
    // If tile is not claimed, and there is no lower game,
    // then this tile should be empty
    if (tile.claimed===null) return null;
    
    return getPlayerIcon(theme, tile.claimed);
}

export default useGetTileIcon;