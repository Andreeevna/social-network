import s from './Button.module.css'
import React, { FC } from 'react'
interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes { }

const Button: FC<ButtonProps> = (props) => {
    const { className, children, ...propsOther } = props;

    return (
        <button
            className={s.button + (className ? ' ' + className : '')}
            {...propsOther}
        >{children}</button>
    );
}

export default Button;