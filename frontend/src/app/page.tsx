"use client";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    document.title = "Lexis";
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
      <h1 style={{ fontSize: 70, fontWeight: "bold" }}>Bem-vindo ao Lexis</h1>
      <p style={{ fontSize: 30, color: "#555" }}>
        O seu sistema completo para gerenciamento de bibliotecas.
      </p>
      <p style={{ fontSize: 20, maxWidth: "600px", margin: "20px auto", color: "#777" }}>
        Busque livros, gerencie empréstimos e otimize sua biblioteca com nossa plataforma intuitiva.
      </p>
      <button
        onClick={() => window.location.href = "/books"}
        className="mt-4 px-6 py-3 text-lg p-2 rounded border border-solid cursor-pointer bg-stone-900 border-stone-900 text-neutral-100 hover:bg-stone-800 transition-colors"
      >
        Explorar Biblioteca
      </button>
    </div>
  );
}
