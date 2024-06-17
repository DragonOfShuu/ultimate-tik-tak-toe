import { createContext, useContext } from "react";

export type VisualSettingsDataType = {
    theme: string,
    primaryColor: string,
    secondaryColor: string,
    player1Icon: string,
    player2Icon: string,
    player3Icon: string,
    player4Icon: string,
}

export type VisualSettingsActionType = 
    | { changes: Partial<VisualSettingsDataType> }

export type VisualSettingsContextType = {
    visualSettings: VisualSettingsDataType
    visualSettingsDispatch: React.Dispatch<VisualSettingsActionType>
}

const visualSettingsContext = createContext<VisualSettingsContextType|null>(null)

export const useVisualSettings = () => {
    return useContext(visualSettingsContext) as VisualSettingsContextType 
}

export const visualReducer = (oldState: VisualSettingsDataType, action: VisualSettingsActionType) => {
    const newState = {...oldState, ...action.changes};
    return newState;
}


export default visualSettingsContext;