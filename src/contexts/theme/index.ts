import { createContext, useContext } from "react";
import ThemeType from "../../assets/theme/ThemeTypes";

export type ThemeDataType = 
    ThemeType

export type ThemeActionType = 
    | { changes: Partial<ThemeDataType> }

export type ThemeContextType = {
    theme: ThemeDataType
    themeDispatch: React.Dispatch<ThemeActionType>
}

const ThemeContext = createContext<ThemeContextType|null>(null)

export const useTheme = () => {
    return useContext(ThemeContext) as ThemeContextType 
}

export const themeReducer = (oldState: ThemeDataType, action: ThemeActionType) => {
    const newState = {...oldState, ...action.changes};
    return newState;
}


export default ThemeContext;
