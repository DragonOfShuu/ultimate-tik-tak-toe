import { useReducer, ReactNode } from "react"
import SettingsContext, { SettingsDataType, settingsReducer } from "."

type Props = {
    defaultSettings: SettingsDataType,
    children?: ReactNode
}

const SettingsComp = (props: Props) => {
    const [settings, settingsDispatch] = useReducer(settingsReducer, props.defaultSettings)

    return (
        <SettingsContext.Provider value={{settings, settingsDispatch}}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsComp;