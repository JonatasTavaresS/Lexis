"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const CreateBookPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    authors: "",
    publisher: "",
    publishedYear: "",
    language: "Português",
    genre: "",
    coverImage: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData({ ...formData, coverImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const bookData = {
      isbn: formData.isbn,
      title: formData.title,
      authors: formData.authors.split(","),
      publisher: formData.publisher,
      publishedYear: Number(formData.publishedYear),
      language: formData.language,
      genre: formData.genre.split(","),
      coverImageUrl: formData.coverImage,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) throw new Error("Erro ao criar livro");

      alert("Livro criado com sucesso!");
      router.push("/books");
    } catch (error) {
      console.error(error);
      alert("Falha ao criar livro.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Adicionar Novo Livro</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        {/* Campo de Imagem */}
        <div className="flex flex-col items-center mb-6">
          {previewImage ? (
            <img src={previewImage} alt="Prévia da Capa" className="w-auto h-48 object-contain rounded-lg border" />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-lg border border-gray-300">
              <span className="text-gray-500">Nenhuma imagem selecionada</span>
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2" />
        </div>

        {/* Inputs de Texto */}
        <div className="mb-4">
          <label className="block text-sm font-medium">ISBN</label>
          <input type="text" name="isbn" value={formData.isbn} onChange={handleInputChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Título</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Autores (separados por vírgula)</label>
          <input type="text" name="authors" value={formData.authors} onChange={handleInputChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Editora</label>
          <input type="text" name="publisher" value={formData.publisher} onChange={handleInputChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Ano de Publicação</label>
          <input type="number" name="publishedYear" value={formData.publishedYear} onChange={handleInputChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Select para Idioma */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Idioma</label>
          <select name="language" value={formData.language} onChange={handleInputChange} className="w-full p-2 border rounded bg-white">
            <option value="Português">Português</option>
            <option value="Inglês">Inglês</option>
            <option value="Espanhol">Espanhol</option>
            <option value="Francês">Francês</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Gênero (separados por vírgula)</label>
          <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Botão de Envio */}
        <button type="submit" className="w-full py-3 bg-black text-white font-semibold rounded hover:bg-black transition cursor-pointer">
          Criar Livro
        </button>
      </form>
    </div>
  );
};

export default CreateBookPage;
