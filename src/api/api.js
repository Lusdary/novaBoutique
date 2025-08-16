import axios from "axios";

/* Facilita el trabajo al no tener que repetir la URL cada vez,  corta la petición si se tarda en responder más de 8s*/
const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 8000,
});

/* Trabaja como un filtro para pasar la información tal cuando la API responda */
/* Si hay errores los atrapa antes de que llegue al componente */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

/* Permite usar la API en cualquier lugar, sin estar repitiendo la URL */
export default api;
