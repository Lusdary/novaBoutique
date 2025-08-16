import React, { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import useDebounce from "../hooks/useDebounce";

/* Estados (productos, filtros, busqueda, paginas, categorias) */
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const deb = useDebounce(search, 350);

  const [category, setCategory] = useState("all");
  const [minP, setMinP] = useState("");
  const [maxP, setMaxP] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const [cats, setCats] = useState([]);

  /* Carga los productos y categorias desde la API */
  useEffect(() => {
    loadProducts();
    loadCats();
  }, []);

  /* Trae productos y categorias desde la API */
  function loadProducts() {
    setLoading(true);
    setError(null);
    api
      .get("/products")
      .then((r) => {
        console.log("productos cargados", r.data.length);
        setProducts(r.data);
      })
      .catch((e) => {
        console.log("err load", e);
        setError("Error al cargar los productos");
      })
      .finally(() => setLoading(false));
  }

  function loadCats() {
    api
      .get("/products/categories")
      .then((r) => setCats(r.data))
      .catch(() => {});
  }

  /* Borra un producto, mostrando una alerta antes y despues de */
  function handleDelete(id) {
    if (!window.confirm("¿Desea borrar el producto?")) return;
    const before = products;
    setProducts((p) => p.filter((x) => x.id !== id));
    api
      .delete(`/products/${id}`)
      .then(() => alert("El producto fue eliminado"))
      .catch(() => {
        alert("error borrando");
        setProducts(before);
      });
  }

  /* Optimiza los filtros con useMemo, calculando la lista de productos filtrados según los filtros y la búsqueda*/
  const filtered = useMemo(() => {
    let arr = products;
    if (category !== "all") arr = arr.filter((p) => p.category === category);
    if (deb.trim()) {
      const q = deb.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (minP) arr = arr.filter((p) => p.price >= Number(minP));
    if (maxP) arr = arr.filter((p) => p.price <= Number(maxP));
    return arr;
  }, [products, category, deb, minP, maxP]);

  /* Administra la paginación y selecciona que productos mostrar en cada una de ellas */
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    /* Visualiza toda la UI */
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl mb-4">Productos</h1>

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
        <div className="p-4 bg-red-50 text-red-700 rounded">
          {error} <button onClick={loadProducts}>Reintentar</button>
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="p-4 bg-gray-100 rounded">No hay productos</div>
      )}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {pageItems.map((p) => (
          <ProductCard key={p.id} product={p} onDelete={handleDelete} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}
