import React from "react";

/* Funcion para los botones de paginación, N. de página, total de Páginas, cambio de página  */
export default function Pagination({ page, totalPages, onPage }) {

  /*  Función para ir a la página anterior, pero permite que no exista una página 0, siempre mayor a 1  */
  const prev = () => onPage(Math.max(1, page - 1));

  /* Función para ir a la página siguiente, pero nunca pasa el total de páginas */
  const next = () => onPage(Math.min(totalPages, page + 1));

  /* Agrega botones con estilos para moverse entre páginas */
  return (
    <div className="flex flex-wrap justify-center sm:justify-end gap-2 mt-4 px-4 sm:px-0">
      <button
        onClick={() => onPage(1)}
        disabled={page === 1}
        className="px-3 py-1 border rounded bg-yellow-900 text-white disabled:opacity-50"
      >
        Primera
      </button>

      <button
        onClick={prev}
        disabled={page === 1}
        className="px-3 py-1 border rounded  bg-yellow-800 text-white disabled:opacity-50"
      >
        Anterior
      </button>

      <span className="px-2 py-1">
        Página {page} de {totalPages}
      </span>

      <button
        onClick={next}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded  bg-yellow-800 text-white disabled:opacity-50"
      >
        Siguiente
      </button>

      <button
        onClick={() => onPage(totalPages)}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded bg-yellow-900 text-white disabled:opacity-50"
      >
        Última
      </button>
    </div>
  );
}
