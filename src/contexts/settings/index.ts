import { createContext, useContext } from 'react'

export type SettingsDataType = {
    x: number,
    y: number,
    depth: number,
    inARowCount: number,
    playerCount: number,
}

export const SettingsDataRanges: {[value in keyof SettingsDataType]: [number, number]|null} = {
    x: [1, 5],
    y: [1, 5],
    depth: [1, 3],
    inARowCount: null,
    playerCount: [2, 4],
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