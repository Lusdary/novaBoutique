import React from 'react'

export default function SearchBar({ value, onChange }) {

  return (

    <div className="flex items-center gap-2">

      <input
        aria-label="Buscar productos"
        className="border rounded p-2 w-64"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Buscar por nombre o categoría..."
      />
      
      <button type="button" className="bg-amber-200 text-black px-3 py-2 rounded" onClick={() => onChange('')}>
        Limpiar
      </button>
    </div>
  )
}
