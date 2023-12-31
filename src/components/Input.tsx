import React, { useState } from 'react'
import styled, { RuleSet } from 'styled-components';
import AppColors from '../styles/colors';

interface InputProps {
    title?: string,
    type?: string,
    placeholder?: string,
    value?: any,
    onChangeHandler?: Function,
    readOnly?: boolean,
    defaultValue?: string | string[],
    inputStyle?:  RuleSet<object>;
    required?: boolean;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement> & React.FocusEventHandler<HTMLInputElement>
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ title, onFocus, inputStyle, disabled,type, placeholder, value, onChangeHandler, readOnly = false, required = false, defaultValue }) => {
    const [hasText, setHasText] = useState(false);

    const handleInputChange = (e: any) => {   
        onChangeHandler && onChangeHandler(e.target.value);
        if(e.target.value){
            setHasText(true)
        } else {
            setHasText(false)
        }
    }

    return (
        <InputElement
            type={type}
            name={title}
            id={title}
            placeholder={placeholder}
            $customStyle={inputStyle}
            value={value}
            min="0"
            onChange={e => handleInputChange(e)}
            readOnly={readOnly}
            onFocus={onFocus}
            required={true}
            disabled={disabled}
            defaultValue={defaultValue}
            onBlur={() => setHasText(!!value)}
            className={hasText ? 'hasText' : ''}
        ></InputElement>
    )
}

export default Input

const InputElement = styled.input<{$customStyle?:RuleSet<object>}>`
    padding: 0.75rem 1rem;
    border-width: 0.1px 0.1px 2px 0.1px;
    margin: 0.5rem 0;
    border-color: ${AppColors.ThemeBlueShadow};
    border-radius: 0.375rem;
    outline:none;
    width: 100%;
    &:focus {
    border-color: ${AppColors.ThemeBlue};
    outline: 2px solid transparent;
    outline-offset: 2px;
       }
    ${(props)=> props.$customStyle}
`
