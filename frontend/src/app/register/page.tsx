"use client";
import { useState } from "react";
import RegistrationForm from "../components/Auth/RegistrationForm";

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFormSubmit = async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar conta. Verifique os dados e tente novamente.");
      }

      setSuccess("Conta criada com sucesso! Agora você pode fazer login.");
    } catch (error) {
      setError("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-6 py-64 w-full h-full bg-neutral-100">
      <RegistrationForm onSubmit={handleFormSubmit} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default RegisterPage;
