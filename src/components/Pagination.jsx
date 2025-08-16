import React from "react";

/* Funcion para los botones de paginación, N. de página, total de Páginas, cambio de página */
export default function Pagination({ page, totalPages, onPage }) {
  /* Función para ir a la página anterior, pero permite que no exista una página 0, siempre mayor a 1 */
  const prev = () => onPage(Math.max(1, page - 1));

  /* Función para ir a la página siguiente, pero nunca pasa el total de páginas */
  const next = () => onPage(Math.min(totalPages, page + 1));

  /* Agrega botones con estilos para moverse entre páginas */
  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={() => onPage(1)}
        disabled={page === 1}
        className="px-2 py-1 border rounded bg-yellow-900 text-white"
      >
        Primera
      </button>

      <button
        onClick={prev}
        disabled={page === 1}
        className="px-2 py-1 border rounded bg-yellow-800 text-white"
      >
        Anterior
      </button>

      <span>
        {" "}
        Página {page} de {totalPages}{" "}
      </span>

      <button
        onClick={next}
        disabled={page === totalPages}
        className="px-2 py-1 border rounded bg-yellow-800 text-white"
      >
        Siguiente
      </button>

      <button
        onClick={() => onPage(totalPages)}
        disabled={page === totalPages}
        className="px-2 py-1 border rounded bg-yellow-900 text-white"
      >
        Última
      </button>
    </div>
  );
}
