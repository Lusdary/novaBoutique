import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

/* Verifica los datos, y si hay un ID significa que se está editando, de lo contrario creando */
export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  /* Almacena los datos del formulario */
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  /* Estado de carga y error */
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

/* Carga los productos del formulario, para luego editarlos */
  useEffect(() => {
    if (editing) {
      setLoading(true);
      const saved = JSON.parse(localStorage.getItem("products")) || [];
      const prod = saved.find((p) => p.id === Number(id));
      if (prod) setForm(prod);
      setLoading(false);
    }
  }, [editing, id]);

  /* Actualiza el formulario, K funciona para los campos, V para valores del usuario */
  function onChange(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  /* Agarra los productos guardados para actualizarlos o crear uno nuevo */
  function submit(e) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    try {
      const saved = JSON.parse(localStorage.getItem("products")) || [];

      /* Si se edita, guarda el producto, si se crea proporciona un ID único y guarda los datos en localStorage */
      if (editing) {
        const updated = saved.map((p) =>
          p.id === Number(id) ? { ...form, id: Number(id) } : p
        );
        localStorage.setItem("products", JSON.stringify(updated));
      } else {
        const newId =
          saved.length > 0 ? Math.max(...saved.map((p) => p.id)) + 1 : 1;
        const newProd = { ...form, id: newId };
        localStorage.setItem("products", JSON.stringify([...saved, newProd]));
      }

      navigate("/");
    } catch (e) {
      setErr("Error al guardar producto");
    } finally {
      setLoading(false);
    }
  }

  /* Proporciona estilos a la página */
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Link to="/" className="text-sm text-black">
        ← Volver
      </Link>

      <h2 className="text-xl mt-2">
        {editing ? "Editar" : "Crear"} producto
      </h2>

      {err && <div className="p-2 bg-red-100 text-red-700 rounded">{err}</div>}
      {loading && <div className="p-2">Cargando...</div>}

      <form onSubmit={submit} className="mt-4 space-y-3">
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
