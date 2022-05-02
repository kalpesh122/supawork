import type { TextareaHTMLAttributes } from "react";

import { Field } from "formik";
import styled from "styled-components";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  className?: string;
}

function TextArea({ name, label, className, ...rest }: Props) {
  return (
    <TextAreaContainer className={className}>
      <label htmlFor={name}>{label || name}</label>

      <Field name={name} id={name} as="textarea" {...rest} />
    </TextAreaContainer>
  );
}

const TextAreaContainer = styled.div`
  label {
    font-weight: 600;
    font-size: 18px;
    letter-spacing: -0.02em;
    color: rgba(32, 14, 50, 0.3);
    margin-bottom: 8px;
    display: block;
  }

  textarea {
    background: #f7f7f7;
    border-radius: 10px;
    border: none;
    padding: 23px 16px;
    width: 100%;
    height: 162px;
    color: #200e32;
    font-weight: 600;
    font-size: 18px;
  }
`;

export default TextArea;
