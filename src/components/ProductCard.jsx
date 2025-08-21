import React from "react";
import { Link } from "react-router-dom";

/* Muestra información de un producto, y agrega botones de acción (delete) */
export default function ProductCard({ product, onDelete }) {
  return (
    /* Proporciona la card del producto, adjunta información del mismo */
    <div className="border rounded-xl shadow-md p-4 flex flex-col justify-between bg-white">
      <div className="flex justify-center items-center h-40 mb-3">
        {/* Imagen del producto con estilos para evitar que se deforme */}
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>

{/* Almacena información del producto */}
      <h2 className="text-lg font-semibold line-clamp-2">{product.title}</h2>
      <p className="text-gray-600 mt-1">${product.price}</p>

{/* Botones ver, editar y borrar */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-center">
        <Link
          to={`/detalle/${product.id}`}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition text-center"
        >
          Ver
        </Link>

        <Link
          to={`/edit/${product.id}`}
          className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition text-center"
        >
          Editar
        </Link>

        <button
          onClick={onDelete}
          className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition text-center"
        >
          Borrar
        </button>
      </div>
    </div>
  );
}

