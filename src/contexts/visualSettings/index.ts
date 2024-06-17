import { createContext, useContext } from "react";
import ThemeType from "../../assets/theme/ThemeTypes";

export type VisualSettingsDataType = 
    ThemeType

export type VisualSettingsActionType = 
    | { changes: Partial<VisualSettingsDataType> }

export type VisualSettingsContextType = {
    visualSettings: VisualSettingsDataType
    visualSettingsDispatch: React.Dispatch<VisualSettingsActionType>
}

const VisualSettingsContext = createContext<VisualSettingsContextType|null>(null)

export const useVisualSettings = () => {
    return useContext(VisualSettingsContext) as VisualSettingsContextType 
}

export const visualSettingsReducer = (oldState: VisualSettingsDataType, action: VisualSettingsActionType) => {
    const newState = {...oldState, ...action.changes};
    return newState;
}


export default VisualSettingsContext;
