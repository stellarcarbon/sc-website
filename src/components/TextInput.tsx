import { HTMLProps } from "react";

interface TextInputProps extends HTMLProps<HTMLInputElement> {}

export default function TextInput({
  name,
  placeholder,
  value,
  disabled,
  onChange,
}: TextInputProps) {
  return (
    <input
      className={`w-full p-2 rounded border text-black ${
        disabled
          ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-white border-black"
      }`}
      disabled={disabled}
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
