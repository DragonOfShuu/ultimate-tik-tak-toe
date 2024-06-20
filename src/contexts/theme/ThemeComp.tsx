import { ReactNode, useReducer } from 'react'
import ThemeContext, { themeReducer } from '.'
import ThemeType from '../../assets/theme/ThemeTypes'
import defaultTheme from '../../assets/theme/default/defaultTheme'
import React from 'react'

type Props = {
    children?: ReactNode,
    theme?: ThemeType
}

const DefaultTheme = React.lazy(()=> import('../../assets/theme/default/defaultThemeComp'))

const ThemeComp = (props: Props) => {
    const [theme, themeDispatch] = useReducer(themeReducer, props.theme??defaultTheme)

    return (
        <ThemeContext.Provider value={{theme: theme, themeDispatch: themeDispatch}}>
            <React.Suspense>
                {
                    (()=> {
                        switch (theme.theme) {
                            case 'default': return <DefaultTheme />
                            default: return <DefaultTheme />
                        }
                    })()
                }
            </React.Suspense>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeComp;