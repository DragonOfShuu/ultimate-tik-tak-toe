import React, { useEffect, useState } from "react";
import styles from "./NumberInput.module.sass";

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & { value: number };

const NumberInput = (props: Props) => {
    const { className, onBlur, value, ...inputProps } = props;
    const [tempValue, setTempValue] = useState<string | undefined>(
        props.value.toString(),
    );

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (tempValue !== "") onBlur?.(e);

        setTempValue(undefined);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue =
            e.target.value === "" ? "" : Number.parseInt(e.target.value);
        if (Number.isNaN(newValue)) return;
        setTempValue(newValue.toString());
    };

    useEffect(() => {
        setTempValue(value.toString());
    }, [value]);

    return (
        <div className={className}>
            <input
                {...inputProps}
                value={tempValue ?? value}
                type="number"
                className={`${styles.input} w-full h-full`}
                onBlur={handleBlur}
                onChange={handleChange}
            />
        </div>
    );
};

export default NumberInput;
