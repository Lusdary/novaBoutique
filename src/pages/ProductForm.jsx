import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/api";

export default function ProductForm() {
  /* Prepara estados para el formuulario e indica si se está creando o editando */
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  /* Carga los datos del producto para actualizarlos */
  useEffect(() => {
    if (editing) {
      setLoading(true);
      api
        .get(`/products/${id}`)
        .then((r) =>
          setForm({
            title: r.data.title,
            price: r.data.price,
            description: r.data.description,
            image: r.data.image,
            category: r.data.category,
          })
        )
        .catch(() => setErr("No se puede cargar"))
        .finally(() => setLoading(false));
    }
  }, [editing, id]);

  /* Actualiza los campos del formulario cuando el usuario escribe */
  function onChange(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  /* Envía los datos a la API, sin importar si está creando o editando, además maneja errores */
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    try {
      if (editing) {
        await api.put(`/products/${id}`, form);
        alert("Actualizado :)");
      } else {
        await api.post("/products", form);
        alert("Creado con éxito");
      }
      navigate("/");
    } catch (e) {
      setErr("Error al guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    /* Aporta lógica a la sección */
    <div className="max-w-2xl mx-auto p-4">
      <Link to="/" className="text-sm text-black">
        ← Volver
      </Link>

      <h2 className="text-xl mt-2">{editing ? "Editar" : "Crear"} producto</h2>

      {err && <div className="p-2 bg-red-100 text-red-700 rounded">{err}</div>}

      {loading && <div className="p-2">Cargando...</div>}

      <form onSubmit={submit} className="mt-4 space-y-3">
        {/* Campos del formulario para que el usuario actualice los datos */}
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded p-2"
            placeholder="Título"
            value={form.title}
            onChange={(e) => onChange("title", e.target.value)}
            required
          />

          <input
            className="w-28 border rounded p-2"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => onChange("price", e.target.value)}
            required
          />
        </div>

        <input
          className="border rounded p-2 w-full"
          placeholder="Categoría"
          value={form.category}
          onChange={(e) => onChange("category", e.target.value)}
        />

        <input
          className="border rounded p-2 w-full"
          placeholder="Imagen (url)"
          value={form.image}
          onChange={(e) => onChange("image", e.target.value)}
        />

        <textarea
          className="border rounded p-2 w-full"
          rows="4"
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
        />

        <div className="flex gap-2">
          <button
            className="bg-yellow-800 text-white px-3 py-2 rounded"
            type="submit"
            disabled={loading}
          >
            {editing ? "Guardar" : "Crear"}
          </button>

          <Link to="/" className="px-3 py-2 bg-yellow-600 rounded text-white">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
