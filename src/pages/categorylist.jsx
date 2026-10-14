import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function CategoryList() {
  const { categoria } = useParams()
  const navigate = useNavigate()
  const { esFavorito, agregarOQuitarFavorito } = useFavorites()

  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // guarda lo que el usuario escribe en el menu de busqueda
  const [busqueda, setBusqueda] = useState('')

  useEffect(function () {
    async function cargarProductos() {
      try {
        setCargando(true)
        setError(null)

        let url

        // Si el usuario escribió algo en el buscador, usamos el endpoint de búsqueda
        // Si no escribió nada, usamos el endpoint de categoría
        if (busqueda === '') {
          url = 'https://dummyjson.com/products/category/' + categoria
        } else {
          url = 'https://dummyjson.com/products/search?q=' + busqueda
        }

        const respuesta = await fetch(url)

        if (respuesta.ok === false) {
          throw new Error('No se pudo obtener los productos')
        }

        const datos = await respuesta.json()
        setProductos(datos.products)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    cargarProductos()
  }, [categoria, busqueda]) // se repite cuando cambia la categoria o cuando cambia lo que buscás

  function manejarCambioDeInput(evento) {
    setBusqueda(evento.target.value)
  }

  if (cargando) {
    return <p className="bg-gray-50 p-8 min-h-screen text-gray-600">Cargando productos...</p>
  }

  if (error) {
    return <p className="bg-gray-50 p-8 min-h-screen text-gray-600">Ocurrió un error: {error}</p>
  }

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <button
        onClick={function () {
          navigate(-1)
        }}
        className="mb-4 rounded-2xl bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-900"
      >
        ← Volver
      </button>

      <h2 className="mb-4 text-2xl font-bold text-gray-900">Categoría: {categoria}</h2>

      <input
        type="text"
        value={busqueda}
        onChange={manejarCambioDeInput}
        placeholder="Buscar producto por nombre..."
        className="mb-4 w-64 rounded-2xl border border-gray-300 px-3 py-1"
      />

      <ul className="flex flex-wrap justify-center gap-6">
        {productos.map(function (producto) {
          return (
            <li key={producto.id} className="w-48 rounded-2xl border border-gray-200 bg-white p-4">
              <img src={producto.thumbnail} alt={producto.title} className="mb-2 w-full rounded-xl" />
              <p className="text-sm text-gray-500">Id: {producto.id}</p>
              <p className="font-semibold text-gray-900">{producto.title}</p>
              <p className="mb-2 text-gray-600">${producto.price}</p>

              <button
                onClick={function () {
                  agregarOQuitarFavorito(producto)
                }}
                className="mb-2 w-full rounded-2xl bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-900"
              >
                {esFavorito(producto.id) ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
              </button>

              <Link to={'/item/' + producto.id}>
                <button className="w-full rounded-2xl bg-orange-500 px-3 py-1 text-sm text-white hover:bg-orange-600">
                  Ver detalle
                </button>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}