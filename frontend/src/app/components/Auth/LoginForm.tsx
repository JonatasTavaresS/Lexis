"use client";

import React, { useState } from "react";
import FormInput from "./FormInput";

interface LoginFormProps {
  onSubmit?: (formData: {
    email: string;
    password: string;
  }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 bg-white rounded border border-solid border-D9D9D9 border-opacity-10 min-w-80 max-sm:w-full max-sm:min-w-[unset]"
    >
      <FormInput
        type="email"
        placeholder="E-mail"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        aria-label="E-mail"
        aria-required="true"
      />
      <FormInput
        type="password"
        placeholder="Senha"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        aria-label="Senha"
        aria-required="true"
      />
      <div className="w-full">
        <button
          type="submit"
          className="p-2 w-full text-base rounded border border-solid cursor-pointer bg-stone-900 border-stone-900 text-neutral-100 hover:bg-stone-800 transition-colors"
        >
          Entrar
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
