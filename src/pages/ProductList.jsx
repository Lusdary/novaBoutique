import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

/* Definición de los estados que se van a manejar */
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minP, setMinP] = useState("");
  const [maxP, setMaxP] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [cats, setCats] = useState([]);

 /* Lee los mensajes desde el localStorage para evitar llamadas innecesarias a la API */
 /* Si no hay nada, axios trae datos simúltaneos desde una API de prueba, lo que se obtiene se guarda en localStorage */
  useEffect(() => {
    async function loadData() {
      const saved = JSON.parse(localStorage.getItem("products"));
      if (saved && saved.length > 0) {
        setProducts(saved);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const [prodRes, catRes] = await Promise.all([
          axios.get("https://fakestoreapi.com/products"),
          axios.get("https://fakestoreapi.com/products/categories"),
        ]);

        setProducts(prodRes.data);
        setCats(catRes.data);
        localStorage.setItem("products", JSON.stringify(prodRes.data));
      } 
      /* Si algo falla, muestra un mensaje de error */
      catch {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  /* Permite eliminar productos */
  function handleDelete(id) {
    if (!window.confirm("¿Desea borrar el producto?")) return;
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

 /* Para aplicar todos los filtros */
 /* useMemo funciona para que solo se recalculen cuando se cambian los filtros o los productos*/
  const filtered = useMemo(() => {
    let arr = products;
    if (category !== "all") arr = arr.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }
    if (minP) arr = arr.filter((p) => p.price >= Number(minP));
    if (maxP) arr = arr.filter((p) => p.price <= Number(maxP));
    return arr;
  }, [products, category, search, minP, maxP]);

  /* Para la paginación del listado principal */
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  /* Genera la lista de productos con filtros y paginación */
  /* Muestra mensajes de error y estados de carga */
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl mb-4">Productos</h1>

      {/* Filtros */}
      <div className="flex items-start gap-4 mb-4">
        <SearchBar value={search} onChange={setSearch} />
        <div className="flex gap-2">
          <select
            className="border rounded p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Todas</option>
            {cats.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            className="border rounded p-2 w-24"
            placeholder="min"
            value={minP}
            onChange={(e) => setMinP(e.target.value)}
          />
          <input
            className="border rounded p-2 w-24"
            placeholder="max"
            value={maxP}
            onChange={(e) => setMaxP(e.target.value)}
          />
          <button
            className="bg-amber-200 px-3 rounded"
            onClick={() => {
              setMinP("");
              setMaxP("");
              setCategory("all");
              setSearch("");
            }}
          >
            Limpiar
          </button>
        </div>
      </div>

      {loading && <div className="p-4 bg-yellow-50 rounded">Cargando...</div>}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded">{error}</div>
      )}
      {!loading && filtered.length === 0 && (
        <div className="p-4 bg-gray-100 rounded">No hay productos</div>
      )}

      {/* Lista de productos */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {pageItems.map((p) => (
          <ProductCard key={p.id} product={p} onDelete={() => handleDelete(p.id)} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}
