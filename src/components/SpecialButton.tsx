import { ReactNode } from "react"

type Props = {
    className?: string
    children?: ReactNode
    onClick?: (e: React.MouseEvent) => unknown
}

const SpecialButton = (props: Props) => {
    return (
        <div className={props.className}>
            <button 
                className={`bg-fuchsia-700 hover:bg-fuchsia-600 active:bg-fuchsia-800 rounded-lg px-3 py-2 w-full h-full`}
                style={{}}
                onClick={props.onClick}>
                {props.children??''}
            </button>
        </div>
    )
}

export default SpecialButton;