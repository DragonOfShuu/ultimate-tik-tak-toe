import { ReactNode } from "react"

type Props = {
    className?: string
    children?: ReactNode
    onClick?: (e: React.MouseEvent) => unknown
    importance?: boolean
}

const SpecialButton = (props: Props) => {

    const colors = props.importance ? `bg-selected text-back hover:brightness-125 active:bg-sub active:text-selected` : `bg-sub hover:brightness-125 active:bg-sub-alt`

    return (
        <div className={props.className}>
            <button 
                className={`${colors} transition-all rounded-lg px-3 py-2 w-full h-full`}
                style={{}}
                onClick={props.onClick}>
                {props.children??''}
            </button>
        </div>
    )
}

export default SpecialButton;