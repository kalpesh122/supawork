import type { InputHTMLAttributes } from "react";

import { Field } from "formik";
import styled from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
  label?: string;
  data: { value: string; label: string }[];
}

function Select({ name, className, label, data, ...rest }: Props) {
  return (
    <SelectStyles
      as={Field}
      name={name}
      forwardedAs="select"
      className={className}
      required
      {...rest}
    >
      <option value="" disabled>
        {label || name}
      </option>

      {data.map((datum) => (
        <option key={datum.value} value={datum.value}>
          {datum.label}
        </option>
      ))}
    </SelectStyles>
  );
}

const SelectStyles = styled.input`
  width: 100%;
  height: 66px;
  background: #f7f7f7;
  border-radius: 10px;
  border: none;
  padding: 0 16px;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: #200e32;
  margin-bottom: 41px;
`;

export default Select;
