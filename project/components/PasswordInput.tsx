import FloatingLabelInput from "./FloatingLabelInput";
import ShowPasswordIcon from "../public/vectors/ShowPasswordIcon.svg";
import { useState } from "react";

interface Props {
  className?: string;
  label?: string;
}

function PasswordInput({ className, label }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FloatingLabelInput
      name="password"
      label={label || "Password"}
      type={showPassword ? "text" : "password"}
      className={className}
      buttonIcon={<ShowPasswordIcon />}
      buttonOnClick={() => setShowPassword((prev) => !prev)}
      required
    />
  );
}

export default PasswordInput;
