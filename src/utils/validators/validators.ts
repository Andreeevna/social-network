export type FieldValidatorsType = (value: string) => string | undefined;


export const requiredField: FieldValidatorsType = (value) => {
    if(value) return undefined;

    return "Field is required";
}


export const MaxLengthCreator = (maxLength: number):FieldValidatorsType => (value) => {
    if(value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}