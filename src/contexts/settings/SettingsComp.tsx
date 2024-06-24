import { useReducer, ReactNode } from "react"
import SettingsContext, { SettingsDataType, settingsReducer } from "."

type Props = {
    defaultSettings?: SettingsDataType,
    children?: ReactNode
}

const backupSettings: SettingsDataType = {
    x: 3,
    y: 3,
    depth: 2,
    inARowCount: 3,
    playerCount: 2,
}

const SettingsComp = (props: Props) => {
    const [settings, settingsDispatch] = useReducer(settingsReducer, props.defaultSettings??backupSettings)

    return (
        <SettingsContext.Provider value={{settings, settingsDispatch}}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsComp;