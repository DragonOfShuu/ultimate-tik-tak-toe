import React from 'react'
import styles from './NumberInput.module.sass';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const NumberInput = (props: Props) => {

    const {className, ...inputProps} = props;
    
    return (
        <div className={className}>
            <input {...inputProps} type='number' className={`${styles.input}`} />
        </div>
    )
}

export default NumberInput
