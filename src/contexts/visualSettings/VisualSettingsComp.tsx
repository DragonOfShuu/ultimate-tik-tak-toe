import { ReactNode, useReducer } from 'react'
import VisualSettingsContext, { visualSettingsReducer } from '.'
import defaultTheme from '../../assets/theme/default/theme'
import ThemeType from '../../assets/theme/ThemeTypes'

type Props = {
    children?: ReactNode,
    theme?: ThemeType
}

const VisualSettingsComp = (props: Props) => {
    const [visualSettings, visualSettingsDispatch] = useReducer(visualSettingsReducer, props.theme??defaultTheme)

    return (
        <VisualSettingsContext.Provider value={{visualSettings, visualSettingsDispatch}}>
            {props.children}
        </VisualSettingsContext.Provider>
    )
}

export default VisualSettingsComp;