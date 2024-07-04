import { createContext, useContext } from "react";
import parseChanges from "../../libs/valueManagement/ValueManager";
import { MinMaxRule } from "../../libs/valueManagement/rules";
import { RuleList } from "../../libs/valueManagement/RuleTypes";

export type SettingsDataType = {
    size: number;
    depth: number;
    inARowCount: number;
    playerCount: number;
};

export const SettingsDataRules: RuleList<SettingsDataType> = {
    size: new MinMaxRule(3, 5),
    depth: new MinMaxRule(1, 3),
    inARowCount: new MinMaxRule(1, "size"),
    playerCount: new MinMaxRule(2, 4),
};

export type SettingsActionType = {
    type: "update";
    snew: Partial<SettingsDataType>;
};

export type SettingsContextType = {
    settings: SettingsDataType;
    settingsDispatch: React.Dispatch<SettingsActionType>;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

export const useSettings = () => {
    return useContext(SettingsContext) as SettingsContextType;
};

export const settingsReducer = (
    prevState: SettingsDataType,
    action: SettingsActionType,
) => {
    const newState = { ...prevState };
    switch (action.type) {
        case "update": {
            return {
                ...newState,
                ...parseChanges(prevState, action.snew, SettingsDataRules),
            };
        }
    }
};

export default SettingsContext;
