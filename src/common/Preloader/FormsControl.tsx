import React from "react";
import { WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import styles from "./FormsControl.module.css";


type FormControlsPropsType = {
    meta: WrappedFieldMetaProps,
    children: React.ReactNode,
    textTitle?: string | undefined
}


export const FormControls: React.FC<FormControlsPropsType> = ({ meta: { touched, error }, children, textTitle }) => {
    const hasError = touched && error;

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : " ")}>
            <div>
                {/* // <textarea {...input} {...props} /> */}
                {children}
                {textTitle}
            </div>
            {hasError && <span> {error} </span>}
        </div>
    )
}




export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props

    return <FormControls {...props}><textarea {...input} {...restProps} /></FormControls>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props

    return <FormControls {...props}><input {...input} {...restProps} /></FormControls>
}


export const Radio: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props

    return <FormControls {...props}><input {...input} {...restProps} /></FormControls>
}

