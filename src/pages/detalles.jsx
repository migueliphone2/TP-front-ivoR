import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function ItemDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { esFavorito, agregarOQuitarFavorito } = useFavorites()

  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(function () {
    async function cargarProducto() {
      try {
        setCargando(true)
        setError(null)

        const respuesta = await fetch('https://dummyjson.com/products/' + id)

        if (respuesta.ok === false) {
          throw new Error('Producto no encontrado')
        }

        const productoRecibido = await respuesta.json()
        setProducto(productoRecibido)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    cargarProducto()
  }, [id])

  if (cargando) {
    return <p className="bg-gray-50 p-8 min-h-screen text-gray-600">Cargando producto...</p>
  }

  if (error) {
    return <p className="bg-gray-50 p-8 min-h-screen text-gray-600">Ocurrió un error: {error}</p>
  }

  return (
    <div className="flex flex-col items-center gap-2 bg-gray-50 p-8 min-h-screen">
      <button
        onClick={function () {
          navigate(-1)
        }}
        className="rounded-2xl bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-900"
      >
        ← Volver
      </button>

      <h1 className="text-2xl font-bold text-gray-900">{producto.title}</h1>
      <img src={producto.thumbnail} alt={producto.title} className="w-48 rounded-xl" />
      <p className="text-gray-600">Precio: ${producto.price}</p>
      <p className="text-gray-600">Descripción: {producto.description}</p>
      <p className="text-gray-600">Marca: {producto.brand}</p>

      <button
        onClick={function () {
          agregarOQuitarFavorito(producto)
        }}
        className="rounded-2xl bg-orange-500 px-3 py-1 text-sm text-white hover:bg-orange-600"
      >
        {esFavorito(producto.id) ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
      </button>
    </div>
  )
}