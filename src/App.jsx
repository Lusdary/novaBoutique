import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ProductForm from "./pages/ProductForm";

/* Contenedor principal de la app, cuerpo o base de la misma */
/* Se adapta al gusto del cliente modo oscuro/claro */
export default function App() {
  return (
    <div className="min-h-screen bg-yellow-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <header className="bg-yellow-800 text-white p-4 flex justify-between items-center">
        <Link to="/" className="font-bold">
          NovaBoutique✨
        </Link>
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">
            Inicio
          </Link>

          <Link to="/crear" className="hover:underline">
            Crear Producto
          </Link>
        </nav>
      </header>

      <main className="p-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/detalle/:id" element={<ProductDetail />} />
          <Route path="/crear" element={<ProductForm />} />
          <Route path="/editar/:id" element={<ProductForm />} />
        </Routes>
      </main>
    </div>
  );
}
