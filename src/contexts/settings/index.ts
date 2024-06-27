import { createContext, useContext } from 'react'
import parseChanges, { MinMaxRule, RuleList } from '../../libs/ValueManager'

export type SettingsDataType = {
    x: number,
    y: number,
    depth: number,
    inARowCount: number,
    playerCount: number,
}

export const SettingsDataRules: RuleList<SettingsDataType> = {
    x: new MinMaxRule(3, 5),
    y: new MinMaxRule(3, 5),
    depth: new MinMaxRule(1, 3),
    inARowCount: new MinMaxRule(1, 'x'),
    playerCount: new MinMaxRule(2, 4),
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
            return {...newState, ...parseChanges(prevState, action.snew, SettingsDataRules)};
        }    
    }
}

export default SettingsContext;
