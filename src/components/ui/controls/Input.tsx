import { ChangeEventHandler } from "react";

export default function Input({
  value,
  onChange,
  name,
  type,
  required,
  className,
}: {
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  type: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <input
      className={`rounded-lg border-2 border-gray-200 px-4 py-2 mb-4 ${className}`}
      value={value}
      onChange={onChange}
      name={name}
      type={type}
      required={required}
    />
  );
}
