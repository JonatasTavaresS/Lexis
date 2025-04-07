"use client";

import React, { useState } from "react";
import FormInput from "./FormInput";

interface RegistrationFormProps {
  onSubmit?: (formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Nome é obrigatório";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Sobrenome é obrigatório";
    }

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

    // Limpa o erro quando o usuário começa a digitar
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
      className="flex flex-col gap-6 p-6 bg-white rounded border border-solid border-black border-opacity-10 min-w-80 max-sm:w-full max-sm:min-w-[unset]"
    >
      <FormInput
        placeholder="Nome"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
        aria-label="Nome"
        aria-required="true"
      />
      <FormInput
        placeholder="Sobrenome"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName}
        aria-label="Sobrenome"
        aria-required="true"
      />
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
          Registrar
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
