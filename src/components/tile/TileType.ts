
type TileType = {
    claimed: number|null
    innerGame: TileType[]
    id: string
}

export default TileType;