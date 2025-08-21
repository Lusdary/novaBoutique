import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

/* Obtiene el ID del producto y guarda información del mismo, inicialmente está en estado nulo */
export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  /* Carga el producto desde localstorage y guarda los datos temporalmente en él */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    const prod = saved.find((p) => p.id === Number(id));
    if (prod) setProduct(prod);
  }, [id]);

  /* En caso de no encontrar el producto, muestra un mensaje */
  if (!product) return <div className="p-4">Producto no encontrado</div>;

  /* Agrega estilos a la página "VER" */
  return (
    <div className="max-w-2xl mx-auto p-4">

      {/* Link para volver al listado principal */}
      <Link to="/" className="text-sm text-black">← Volver</Link>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <div className="flex-1 flex justify-center items-center">
          <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
          <p className="text-gray-800">{product.description}</p>
          <p className="text-sm text-gray-500">Categoría: {product.category}</p>
        </div>
      </div>
    </div>
  );
}
