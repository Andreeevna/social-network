import s from './Textarea.module.css'
import React, { FC } from 'react'

interface ITextareaProps {
    className?: string | undefined,
    defaultValue?: string | number | undefined,
    placeholder?: string | undefined,
    value?: string | ReadonlyArray<string> | number | undefined,
    onFocus?: React.FocusEventHandler<HTMLElement>,
    onBlur?: React.FocusEventHandler<HTMLElement>,
    onInput?: React.FormEventHandler<HTMLElement>,
    onChange?: React.FormEventHandler<HTMLElement>,
    id?: string | undefined,
    name?: string | undefined,
    readOnly?: boolean | undefined,
    disabled?: boolean | undefined,
}

// interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
//     // onChange?: (e: React.FormEvent<HTMLInputElement>) => void | undefined
// };

interface TextareaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, React.AriaAttributes { }

const Textarea: FC<TextareaProps> = (props) => {
    const { className, ...propsOther } = props

    return (
        <textarea
            className={s.textarea + (className ? ' ' + className : '')}
            {...propsOther}
        ></textarea>
    );
}

export default Textarea;