import React, { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  name: string;
  label?: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  name,
  label,
  error,
  type = "text",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block mb-1 text-sm text-stone-900">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`px-4 py-3 w-full text-base bg-white rounded border border-solid ${error ? "border-red-500" : "border-black border-opacity-10"
          } text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-opacity-20`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
