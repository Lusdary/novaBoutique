import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

/* Estados del producto */
export default function ProductDetail() {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  /* Para traer la información del producto  cuando el componente carga*/
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setErr(null);
    api
      .get(`/products/${id}`)
      .then((r) => setProd(r.data))
      .catch(() => setErr("Error"))
      .finally(() => setLoading(false));
  }, [id]);

  /* Mensajes como indicadores mientras se espera la respuesta de  la API o si ocurre un error */
  if (loading) return <div className="p-4">Cargando...</div>;

  if (err) return <div className="p-4 text-red-600">{err}</div>;

  if (!prod) return <div className="p-4">No encontrado</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Regresa a la página principal (lista de productos) */}
      <Link to="/" className="text-sm text-black">
        ← Volver
      </Link>

      {/* Muestra la imagen del producto y su descripción*/}
      <div className="mt-4 flex gap-6">
        <img
          src={prod.image}
          alt={prod.title}
          className="w-64 h-64 object-contain bg-gray-100 p-4 rounded"
        />

        <div>
          <h2 className="text-xl font-semibold">{prod.title}</h2>

          <p className="mt-2 font-bold">${prod.price}</p>

          <p className="mt-2 text-sm text-gray-600">{prod.category}</p>

          <p className="mt-3">{prod.description}</p>

          <div className="mt-4 flex gap-2">
            <Link
              to={`/editar/${prod.id}`}
              className="px-3 py-2 bg-yellow-800 text-white rounded"
            >
              Editar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
