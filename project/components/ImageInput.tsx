import type { InputHTMLAttributes } from "react";

import { useField } from "formik";
import styled from "styled-components";

import CameraIcon from "../public/vectors/CameraIcon.svg";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
}

function ImageInput({ name, className, ...props }: Props) {
  const [field, _, { setValue }] = useField(name);

  return (
    <ImageInputContainer className={className}>
      {field.value ? (
        <img src={URL.createObjectURL(field.value)} alt="" />
      ) : (
        <>
          <CameraIcon />
          Add image
        </>
      )}
      <input
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={(e) => setValue(e.target.files![0])}
        {...props}
      />
    </ImageInputContainer>
  );
}

const ImageInputContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
  border-radius: 15px;
  width: 100%;
  height: 259px;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.02em;
  color: #dadada;
  position: relative;
  overflow: hidden;

  > svg {
    margin-right: 16px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default ImageInput;
