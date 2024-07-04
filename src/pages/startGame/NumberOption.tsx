import SettingsOption from "./SettingsOption";
import { SettingsDataType, useSettings } from "../../contexts/settings";
import { useEffect, useState } from "react";
import NumberInput from "../../components/NumberInput";

type Props = {
    name: keyof SettingsDataType;
    displayName?: string;
    className?: string;
    isInt?: boolean;
    defaultValue?: number;
};

const NumberOption = (props: Props) => {
    const { settings, settingsDispatch } = useSettings();

    const [value, setValue] = useState<number>(props.defaultValue ?? 0);

    const setSetting = (newValue: number) => {
        const newV = props.isInt ? Math.round(newValue) : newValue;
        settingsDispatch({ type: "update", snew: { [props.name]: newV } });
    };

    useEffect(() => {
        setValue(settings[props.name]);
    }, [props.name, settings]);

    const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
        setSetting(Number.parseFloat(e.target.value));
    };

    return (
        <SettingsOption
            className={props.className}
            name={props.displayName ?? props.name}
        >
            <NumberInput value={value} onBlur={handleChange} />
        </SettingsOption>
    );
};

export default NumberOption;
