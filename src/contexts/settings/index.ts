import { createContext, useContext } from 'react'

export type SettingsDataType = {
    x: number,
    y: number,
    depth: number,
    inARowCount: number,
}

export type SettingsActionType = 
    | { type: 'update', snew: Partial<SettingsDataType> }

export type SettingsContextType = {
    settings: SettingsDataType,
    settingsDispatch: React.Dispatch<SettingsActionType>
}

export const SettingsContext = createContext<SettingsContextType|null>(null)

export const useSettings = () => {
    return useContext(SettingsContext) as SettingsContextType;
}

export const settingsReducer = (prevState: SettingsDataType, action: SettingsActionType) => {
    const newState = {...prevState};
    switch (action.type) {
        case 'update': {
            return {...newState, ...action.snew};
        }    
    }
}

export default SettingsContext;