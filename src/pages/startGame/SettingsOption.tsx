import { ReactNode } from 'react'
import { useVisualSettings } from '../../contexts/visualSettings'

type Props = {
    children?: ReactNode
    name?: string
    className?: string
}

const SettingsOption = (props: Props) => {
    const {visualSettings: theme} = useVisualSettings();

    return (
        <div className={props.className}>
            <div className={`flex flex-row items-center py-2 px-4 w-full h-full rounded-lg overflow-hidden`} style={{backgroundColor: theme.colors.secondary[900]}}>
                <p className={`flex-grow`}>
                    {`${props.name}:`}
                </p>
                {/* <div className="flex-grow" /> */}
                <div className={`flex flex-row gap-2 w-20 overflow-hidden`}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default SettingsOption;