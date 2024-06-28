import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
    name?: string;
    className?: string;
};

const SettingsOption = (props: Props) => {
    return (
        <div className={props.className}>
            <div
                className={`flex flex-row items-center py-2 px-4 w-full h-full rounded-lg overflow-hidden`}
            >
                <p className={`flex-grow font-bold uppercase`}>
                    {`${props.name}:`}
                </p>
                <div className={`flex flex-row gap-2 w-20 overflow-hidden`}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default SettingsOption;
