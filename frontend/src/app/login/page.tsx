"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: { email: string; password: string }) => {
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();
      alert("Login bem-sucedido!");
      router.push("/books");
    } catch (error) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="flex overflow-hidden flex-col justify-center items-center px-6 py-64 w-full max-h-screen bg-neutral-100">
      <LoginForm onSubmit={handleFormSubmit} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default LoginPage;
