import { HTMLProps } from "react";

interface TextInputProps extends HTMLProps<HTMLInputElement> {}

export default function TextInput({
  name,
  placeholder,
  value,
  onChange,
}: TextInputProps) {
  return (
    <input
      className="w-full bg-gray-100 p-2 rounded border border-black text-black"
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
