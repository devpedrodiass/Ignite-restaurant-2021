import { useEffect, useRef, useState, useCallback } from "react";

import { useField } from "@unform/core";

import { Container } from "./styles";
import React from "react";

export interface IInputProps {
  name: string;
  icon?: any;
  placeholder: string;
}

const Input = ({ name, icon: Icon, placeholder, ...rest }: IInputProps) => {
  const inputRef = React.createRef<HTMLInputElement>();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    if (!!inputRef.current) {
      setIsFilled(!!inputRef.current?.value);
    }
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        placeholder={placeholder}
        {...rest}
      />
    </Container>
  );
};

export default Input;
