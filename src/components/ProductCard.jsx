import React from "react";
import { Link } from "react-router-dom";

/* Muestra información de un producto, y agrega botones de acción (delete)*/
export default function ProductCard({ product, onDelete }) {
  console.log("render card", product.id);

  return (
    /* Proporciona la card del producto */
    <article className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow flex flex-col justify-between">
      {/* Imágen del producto, con estilos para que no se deforme */}
      <img
        className="w-full h-40 object-contain bg-gray-100 rounded-md"
        src={product.image}
        alt={product.title}
      />

      {/* Almacena la información del producto */}
      <div className="mt-3 flex-1">
        <h3 className="text-sm font-medium">{product.title}</h3>
        <p className="text-gray-600 mt-1 line-clamp-3">{product.description}</p>
        <strong className="text-lg mt-2 block">${product.price}</strong>
      </div>

      {/* Botones ver, editar, borrar */}
      <div className="flex gap-2 mt-4">
        <Link
          to={`/detalle/${product.id}`}
          className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md"
        >
          Ver
        </Link>

        <Link
          to={`/editar/${product.id}`}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
        >
          Editar
        </Link>

        <button
          className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md"
          onClick={() => onDelete(product.id)}
        >
          Borrar
        </button>
      </div>
    </article>
  );
}
