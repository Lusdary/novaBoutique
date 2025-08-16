import { useEffect, useState } from "react";

/* Hook para retrasar la actualización de un valor*/
export default function useDebounce(value, ms = 300) {
  /* Guarda el valor final, luego del retraso */
  const [val, setVal] = useState(value);

  /* Cada que el valor cambie, se esperaran MS para actualizar val, si este cambia antes de terminar, se cancela el timeout anterior*/
  useEffect(() => {
    const t = setTimeout(() => setVal(value), ms);

    return () => clearTimeout(t);
  }, [value, ms]);
  return val;
}
